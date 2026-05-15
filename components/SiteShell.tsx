"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

const GodRaysBackground = dynamic(() => import("@/components/GodRaysBackground"), {
  ssr: false,
});

type LangContextValue = {
  isBengali: boolean;
  toggle: () => void;
};

type NavRefsContextValue = {
  navRefs: RefObject<(HTMLElement | null)[]>;
  logoRef: RefObject<HTMLButtonElement | null>;
};

const LangContext = createContext<LangContextValue | null>(null);
const NavRefsContext = createContext<NavRefsContextValue | null>(null);

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside SiteShell");
  return ctx;
}

export function useNavRefs(): NavRefsContextValue {
  const ctx = useContext(NavRefsContext);
  if (!ctx) throw new Error("useNavRefs must be used inside SiteShell");
  return ctx;
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isBengali, setIsBengali] = useState(false);
  const toggle = useCallback(() => setIsBengali((v) => !v), []);
  const langValue = useMemo(() => ({ isBengali, toggle }), [isBengali, toggle]);

  const navRefs = useRef<(HTMLElement | null)[]>([]);
  const logoRef = useRef<HTMLButtonElement | null>(null);
  const navRefsValue = useMemo(() => ({ navRefs, logoRef }), []);

  return (
    <LangContext.Provider value={langValue}>
      <NavRefsContext.Provider value={navRefsValue}>
        <div className="fixed inset-0 -z-10">
          <GodRaysBackground />
        </div>
        {children}
        <Logo />
        <Navbar />
      </NavRefsContext.Provider>
    </LangContext.Provider>
  );
}
