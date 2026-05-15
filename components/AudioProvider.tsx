"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface AudioContextValue {
  analyserNode: AnalyserNode | null;
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  getFrequencyData: () => Uint8Array<ArrayBuffer>;
}

const AudioCtx = createContext<AudioContextValue>({
  analyserNode: null,
  isPlaying: false,
  isMuted: true,
  toggleMute: () => {},
  getFrequencyData: () => new Uint8Array(128),
});

export function useAudio() {
  return useContext(AudioCtx);
}

export default function AudioProvider({ children }: { children: ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(128));
  const initializedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const initAudio = useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;

    const audio = new Audio("/song.mp3");
    audio.loop = true;
    audio.crossOrigin = "anonymous";

    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    audioElRef.current = audio;
    sourceRef.current = source;
    frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
  }, []);

  const toggleMute = useCallback(() => {
    initAudio();

    const audio = audioElRef.current;
    const ctx = audioCtxRef.current;
    if (!audio || !ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (isMuted) {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    }
  }, [isMuted, initAudio]);

  const getFrequencyData = useCallback(() => {
    if (analyserRef.current) {
      analyserRef.current.getByteFrequencyData(frequencyDataRef.current);
    }
    return frequencyDataRef.current;
  }, []);

  useEffect(() => {
    return () => {
      audioElRef.current?.pause();
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        analyserNode: analyserRef.current,
        isPlaying,
        isMuted,
        toggleMute,
        getFrequencyData,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}
