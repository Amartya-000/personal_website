import type { StaticImageData } from "next/image";
import soloSoloingTitle from "@/public/work/solo-soloing/title.png";
import soloSoloingInterface from "@/public/work/solo-soloing/interface.png";
import ekgBreadboard from "@/public/work/analog-ekg/breadboard.jpg";
import ekgSchematic from "@/public/work/analog-ekg/schematic.png";
import spaceRacingCabinet from "@/public/work/space-racing/cabinet.jpg";
import spaceRacingWiring from "@/public/work/space-racing/wiring.jpg";
import puzzleBox from "@/public/work/escape-room-puzzle/puzzle-box.jpg";
import marimbaSetup from "@/public/work/marimba-research/recording-setup.jpg";
import waveTilterScope from "@/public/work/wave-tilter/oscilloscope.jpg";

export type WorkEmbedConfig = {
  /** URL of the running example to embed. */
  src: string;
  /** Accessible title for the embedded frame. */
  title: string;
  /** Tailwind aspect ratio class, e.g. "aspect-video". Defaults to "aspect-video". */
  aspect?: string;
};

export type WorkImage = {
  src: StaticImageData;
  alt: string;
};

/** A run of paragraph text, or an inline link. */
export type WorkText = string | { text: string; href: string };

/** A plain string, or a list of runs when the paragraph contains links. */
export type WorkParagraph = string | WorkText[];

export type WorkItem = {
  /** URL segment: /work/<slug> */
  slug: string;
  eyebrow: string;
  title: string;
  /** One-line blurb shown on the card. */
  subtitle: string;
  /** Statically imported so the detail page knows its aspect ratio. */
  image: StaticImageData;
  imageAlt: string;
  imageMode?: "cover" | "logo";
  /** Paragraphs of the description shown on the detail page. */
  body: WorkParagraph[];
  /** Secondary images shown below the description. */
  extraImages?: WorkImage[];
  /** Leads the grid and gets the green glow treatment. */
  pinned?: boolean;
  /** Live, running example. Left undefined until an embed exists. */
  embed?: WorkEmbedConfig;
};

const ITEMS: WorkItem[] = [
  {
    slug: "wave-tilter",
    eyebrow: "Featured project",
    title: "Wave-Tilter",
    subtitle: "A waveform generator you control by tilting it.",
    image: waveTilterScope,
    imageAlt: "Wave-Tilter running on an M5Stack Cardputer",
    pinned: true,
    body: [
      "Wave-Tilter turns an M5Stack Cardputer ADV into a signal generator controlled by its IMU. It starts on a triangle wave. Tilting it forward or back morphs the shape toward a square (by steepening and clipping the triangle) or toward a sine. Tilting left or right slides the pitch down or up. Pitch is rate-controlled, so it keeps gliding as long as you hold the tilt, and a key toggles snapping to semitones around a Bb5 reference.",
      "Audio is generated at 48 kHz. I capped output frequency at 4 kHz on the assumption that the signal would come out of the GPIO pins. Partway through, I realized I could clip leads straight onto the 3.5 mm headphone jack and use the existing audio output, which turned out to be the simpler path. The display refreshes at 100 Hz. Work is split across the ESP32's two cores, one generating audio and one drawing the screen, so visuals never interrupt the sound. I wrote it in C++, partly to learn the language before my Embedded Systems class got to it.",
      "I verified the waveforms on an oscilloscope, then used Wave-Tilter to test an RC low-pass filter (1 kΩ, confirmed with a multimeter) with a cutoff around 1.6 kHz. For now it's more instrument than lab tool, but the goal is a pocket generator for quickly checking filters.",
    ],
  },
  {
    slug: "solo-soloing",
    eyebrow: "Music software",
    title: "solo-soloing",
    subtitle:
      "Jazz backing tracks on demand, written by Claude and checked against music theory.",
    image: soloSoloingTitle,
    imageAlt:
      "Solo-Soloing: Not everyone has a band to play with all the time. This is your chance to practice soloing while solo.",
    extraImages: [{ src: soloSoloingInterface, alt: "solo-soloing interface" }],
    body: [
      "solo-soloing builds a rhythm section of bass, piano, and drums to practice soloing over, so you don't need a band in the room. You pick a form and a key, and a FastAPI pipeline has Claude write each part as Strudel code, which plays back right in the browser.",
      "LLMs sound confident about music theory and are often wrong, so every track goes through a nine-check verification suite covering key, form, register, and feel. A failed check is sent back to the pipeline stage that can actually fix it, with up to three retries per stage. The hardest part was style: a track can pass every theory check and still not sound like jazz. The backend is stateless, so it can serve more than one site at almost no hosting cost.",
    ],
  },
  {
    slug: "marimba-research",
    eyebrow: "Research",
    title: "Toward a sustainable and accessible marimba",
    subtitle:
      "Screening 17 everyday materials as cheaper, more sustainable stand-ins for Honduran rosewood.",
    image: marimbaSetup,
    imageAlt:
      "Tap-response recording setup: a sample bar hung on twine inside an open box, with a microphone beside it",
    body: [
      "Marimba bars are traditionally made from Honduran rosewood, prized for its warm tone and slow decay. It's also slow-growing, overlogged, and tied up in illegal trafficking, which makes it hard to source responsibly and expensive to buy. A standard 4.3-octave rosewood marimba from a major manufacturer starts around $7,000. Many students only get time on a shared school instrument, which leaves percussionists behind peers who can practice at home. I started this project in my senior year at Wayzata High School with no background in physics or acoustics. I wanted to find out whether cheap, domestic materials could put practice instruments within reach of schools and players without much money.",
      "Three properties decide whether a material can work as a bar. Density is a rough proxy for durability under repeated strikes. Young's modulus, or stiffness, shapes how a bar feels and how its overtones form. Loss factor sets how quickly the sound dies away, and rosewood's slow decay is what makes rolls sing. The ratio of stiffness to density sets the pitch of a bar of a given shape. A material that matches rosewood's ratio could use the same bar dimensions, so practice on it would carry over to a real instrument. I screened materials on two criteria: stiffness-to-density within 20% of rosewood's, and loss factor within 75% of it. That 75% margin is roughly the gap between rosewood and padauk, a wood already used in marimbas.",
      "I tested 17 materials in three groups. The solid American woods were hickory, cherry, maple, walnut, red oak, white oak, white ash, poplar, pine, and fir. The plywoods were two pine sheathings, Baltic birch, and bamboo. The plastics were PLA and PLA+, 3D-printed at 99.9% infill so they'd behave like solid material. Padauk served as a positive control to check that the method worked. Two cherry samples from different trees showed how much a single species can vary. A rosewood sample was too expensive to buy, so its values came from published measurements.",
      "I designed the method to be replicable without a lab. Density came from a food scale and a ruler. I skipped water displacement because soaking the wood would change its moisture content. For the acoustic properties, I hung each bar on twine near its first bending-mode nodes, about a quarter of the way in from each end, inside a box with two sides open. Then I tapped it with the wooden end of a mallet and recorded the ring with a microphone. An FFT in Audacity gave each bar's fundamental frequency. Combined with density and dimensions, that frequency gives Young's modulus. The loss factor came from the width of the resonance peak 3 dB below its top, divided by the peak frequency. I considered attaching an accelerometer, but its own mass would have changed the damping I was trying to measure. Laser vibrometry, the lab-grade option, was out of budget. I organized the data in Google Sheets and plotted it with pandas and matplotlib.",
      "No material besides rosewood and padauk passed both criteria. The plastics were the densest of everything tested, but far too flexible for their weight, which threw their pitch behavior way off. Six materials landed inside the pitch window (hickory, maple, walnut, cherry, and two pine plywoods), but every one rang out faster than rosewood. Recentering the damping screen on padauk narrowed the field to fir, hickory, and cherry. Fir then dropped out for failing the stiffness test and being too light.",
      "Hickory is the strongest candidate. Its density, about 790 kg/m³, sits between padauk and rosewood (950 kg/m³). Its stiffness is within about a third of a gigapascal of rosewood's 16 GPa, and it falls inside the pitch window. Its weakness is damping. Cherry is lighter and less stiff, but its stiffness-to-density ratio is within about 7% of rosewood's, which makes it a candidate for lighter-duty practice bars. Cost is the real draw: at the time of the study, Honduran rosewood sold for $53 per board foot, against $8 for hickory and $6.20 for cherry.",
      "This is a screening study, not a finished instrument. Next, I'd cut tuned hickory and cherry bars and compare them with rosewood and padauk bars of the same pitch on sustain, overtones, and durability. That would include blind playing and listening tests with percussionists, and experiments with thermal or mechanical treatments to lower hickory's damping. The results also point to a useful split. A concert marimba may need the closest possible rosewood match, but a practice instrument mainly needs to be affordable, stay in tune, and feel close enough.",
      [
        "I presented this work at the 190th meeting of the Acoustical Society of America in Philadelphia in May 2026, as a contender in the POMA Student Paper Competition. The paper is accepted for publication in Proceedings of Meetings on Acoustics. The project was also covered on NPR's ",
        {
          text: "All Things Considered",
          href: "https://www.npr.org/programs/all-things-considered/2026/05/14/all-things-considered-for-may-14-2026",
        },
        " and ",
        {
          text: "Short Wave",
          href: "https://www.npr.org/2026/05/14/nx-s1-5815265/this-week-in-science-sunscreen-from-fish-art-and-aging-and-a-sustainable-marimba",
        },
        ".",
      ],
    ],
  },
  {
    slug: "analog-ekg",
    eyebrow: "Biomedical hardware",
    title: "analog EKG",
    subtitle:
      "A heartbeat pulled out of millivolts at the skin, with three stages of analog circuitry.",
    image: ekgBreadboard,
    imageAlt: "analog EKG circuit",
    extraImages: [
      { src: ekgSchematic, alt: "Hand-drawn schematic of the analog EKG circuit" },
    ],
    body: [
      "I built this with a classmate in Circuits and Signals (EECE 2150). An AD627 instrumentation amplifier takes the 1–3 mV signal from the electrodes, rejects common-mode noise, and applies all of the gain (about 96). Two unity-gain active filters follow it. A 0.40 Hz high-pass strips the DC offset that electrodes pick up at the skin, and a 15.9 Hz low-pass cleans up noise, though it rounds off the sharpest part of the QRS complex. The whole circuit runs on ±1.5 V from AA batteries.",
      "The signal was digitized at 150 Hz on a 14-bit NI USB-6001 and processed in MATLAB. Processing used Butterworth low-pass filters, a bandstop around 60 Hz for mains hum, and a threshold detector that counts heartbeats to estimate heart rate. The QRS came out upside down in our recording, so the signal is flipped before detection.",
    ],
  },
  {
    slug: "space-racing",
    eyebrow: "Game",
    title: "SPACE-RACING",
    subtitle: "An arcade game of laser targets and keypad interruptions.",
    image: spaceRacingCabinet,
    imageAlt: "SPACE-RACING arcade game",
    extraImages: [
      { src: spaceRacingWiring, alt: "Sensor wiring inside the SPACE-RACING cabinet" },
    ],
    body: [
      "I built this for Cornerstone of Engineering in fall 2025. Indicator lights tell the player which of three targets to hit with a laser, and three I2C sensors read by a Raspberry Pi Pico register each hit. A second subsystem, an LCD and keypad, tracks score and time remaining. It also interrupts play with a code the player has to punch in before the game continues.",
      "It's written in MicroPython. Most of the work was in sensor thresholding, timing, and interrupt-driven transitions between game states.",
    ],
  },
  {
    slug: "escape-room-puzzle",
    eyebrow: "Embedded systems",
    title: "Escape room puzzle",
    subtitle: "Mix colors with buttons, then scan keycards in the right order.",
    image: puzzleBox,
    imageAlt: "Escape room puzzle box",
    body: [
      "This was my team's puzzle for a class-wide escape room in Cornerstone of Engineering 2 (spring 2026), placed at the transition between the first and second rooms. It's housed in a wooden security box with a 3D-printed keypad enclosure and an LCD. First, players press four colored buttons together to mix new colors (red and blue make purple), working through orange, purple, and pink to earn a code. Then they scan three colored keycards past a color sensor in order (red, green, blue) to unlock a second code.",
      "I handled the electronics, component selection, and code. The puzzle runs on a Raspberry Pi Pico in MicroPython, with a TCS34725 sensor built for Arduino adapted to run alongside the LCD on its own I2C bus. Calibration took the most work. Red and green read cleanly, but blue barely registered above green, so detection uses relative thresholds tuned from real readings instead of fixed values.",
    ],
  },
];

/** Pinned items lead the grid, so the pin can't drift if entries are reordered. */
export const WORK_ITEMS: WorkItem[] = [...ITEMS].sort(
  (a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false),
);

export function getWorkItem(slug: string): WorkItem | undefined {
  return WORK_ITEMS.find((item) => item.slug === slug);
}
