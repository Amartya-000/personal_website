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
import waveTilterTiltingPoster from "@/public/work/wave-tilter/tilting-poster.jpg";
import waveTilterFilterPoster from "@/public/work/wave-tilter/filter-test-poster.jpg";

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
  altBn: string;
};

export type WorkVideo = {
  /** Path of the file under public/, e.g. "/work/wave-tilter/tilting.mp4". */
  src: string;
  /** A frame from the video, statically imported so the player knows its aspect ratio. */
  poster: StaticImageData;
  caption: string;
  captionBn: string;
};

/** A run of paragraph text, or an inline link. */
export type WorkText = string | { text: string; href: string };

/** A plain string, or a list of runs when the paragraph contains links. */
export type WorkParagraph = string | WorkText[];

/** The text of an entry that changes with the site language. */
export type WorkCopy = {
  eyebrow: string;
  title: string;
  /** One-line blurb shown on the card. */
  subtitle: string;
  /** One key result, set apart in a callout on the detail page and featured card. */
  impact: string;
  imageAlt: string;
  /** Paragraphs of the description shown on the detail page. */
  body: WorkParagraph[];
};

export type WorkItem = WorkCopy & {
  /** URL segment: /work/<slug> */
  slug: string;
  /** Bengali copy, shown when the logo toggle switches the site language. */
  bn: WorkCopy;
  /** Statically imported so the detail page knows its aspect ratio. */
  image: StaticImageData;
  imageMode?: "cover" | "logo";
  /** Secondary images shown below the description. */
  extraImages?: WorkImage[];
  /** Demo clips shown below the description, before any extra images. */
  videos?: WorkVideo[];
  /** Path of a PDF under public/, linked from a button below the description. */
  paper?: string;
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
    impact:
      "Verified on an oscilloscope, then put to work testing a real RC low-pass filter with a cutoff around 1.6 kHz.",
    image: waveTilterScope,
    imageAlt: "Wave-Tilter running on an M5Stack Cardputer",
    pinned: true,
    videos: [
      {
        src: "/work/wave-tilter/tilting.mp4",
        poster: waveTilterTiltingPoster,
        caption: "Tilting Wave-Tilter while an oscilloscope tracks the output.",
        captionBn: "Wave-Tilter কাত করা হচ্ছে, আর অসিলোস্কোপে আউটপুট দেখা যাচ্ছে।",
      },
      {
        src: "/work/wave-tilter/filter-test.mp4",
        poster: waveTilterFilterPoster,
        caption: "Testing an RC low-pass filter, with the output on an oscilloscope.",
        captionBn: "একটা RC লো-পাস ফিল্টার পরীক্ষা, আউটপুট অসিলোস্কোপে।",
      },
    ],
    body: [
      "Wave-Tilter turns an M5Stack Cardputer ADV into a signal generator controlled by its IMU. It starts on a triangle wave. Tilting it forward or back morphs the shape toward a square (by steepening and clipping the triangle) or toward a sine. Tilting left or right slides the pitch down or up. Pitch is rate-controlled, so it keeps gliding as long as you hold the tilt, and a key toggles snapping to semitones around a Bb5 reference.",
      "Audio is generated at 48 kHz. I capped output frequency at 4 kHz on the assumption that the signal would come out of the GPIO pins. Partway through, I realized I could clip leads straight onto the 3.5 mm headphone jack and use the existing audio output, which turned out to be the simpler path. The display refreshes at 100 Hz. Work is split across the ESP32's two cores, one generating audio and one drawing the screen, so visuals never interrupt the sound. I wrote it in C++, partly to learn the language before my Embedded Systems class got to it.",
      "I verified the waveforms on an oscilloscope, then used Wave-Tilter to test an RC low-pass filter (1 kΩ, confirmed with a multimeter) with a cutoff around 1.6 kHz. For now it's more instrument than lab tool, but the goal is a pocket generator for quickly checking filters.",
    ],
    bn: {
      eyebrow: "ফিচার্ড প্রজেক্ট",
      title: "Wave-Tilter",
      subtitle: "একটা ওয়েভফর্ম জেনারেটর, যেটা কাত করে নিয়ন্ত্রণ করা যায়।",
      impact:
        "অসিলোস্কোপে যাচাই করা, তারপর প্রায় ১.৬ kHz কাটঅফের একটা সত্যিকারের RC লো-পাস ফিল্টার পরীক্ষায় কাজে লাগানো।",
      imageAlt: "M5Stack Cardputer-এ চলছে Wave-Tilter",
      body: [
        "Wave-Tilter একটা M5Stack Cardputer ADV-কে সিগন্যাল জেনারেটরে বদলে দেয়, যেটা চলে এর IMU দিয়ে। শুরুতে থাকে একটা ট্রায়াঙ্গল ওয়েভ। সামনে বা পেছনে কাত করলে আকারটা স্কোয়ারের দিকে (ট্রায়াঙ্গলকে খাড়া করে আর ক্লিপ করে) অথবা সাইনের দিকে বদলে যায়। বাঁয়ে বা ডানে কাত করলে পিচ নিচে বা ওপরে সরে যায়। পিচ রেট-কন্ট্রোলড, তাই যতক্ষণ কাত করে রাখবেন ততক্ষণ পিচ সরতেই থাকবে, আর একটা কি চাপলে Bb5 রেফারেন্সের চারপাশে সেমিটোনে স্ন্যাপ করা চালু বা বন্ধ হয়।",
        "অডিও তৈরি হয় ৪৮ kHz-এ। প্রথমে ধরে নিয়েছিলাম সিগন্যাল GPIO পিন দিয়ে বেরোবে, তাই আউটপুট ফ্রিকোয়েন্সি ৪ kHz-এ বেঁধে দিয়েছিলাম। মাঝপথে বুঝলাম, ৩.৫ mm হেডফোন জ্যাকে সরাসরি লিড ক্লিপ করে আগে থেকে থাকা অডিও আউটপুটই ব্যবহার করা যায়, আর সেটাই সহজ পথ হয়ে দাঁড়াল। ডিসপ্লে রিফ্রেশ হয় ১০০ Hz-এ। কাজ ভাগ করা আছে ESP32-এর দুটো কোরে, একটা অডিও তৈরি করে আর একটা স্ক্রিন আঁকে, তাই ছবির জন্য শব্দে কখনো বাধা পড়ে না। এটা আমি C++-এ লিখেছি, খানিকটা এই জন্য যে আমার Embedded Systems ক্লাসে ভাষাটা আসার আগেই শিখে নিতে চেয়েছিলাম।",
        "অসিলোস্কোপে ওয়েভফর্মগুলো যাচাই করেছি, তারপর Wave-Tilter দিয়ে প্রায় ১.৬ kHz কাটঅফের একটা RC লো-পাস ফিল্টার পরীক্ষা করেছি (১ kΩ, মাল্টিমিটারে নিশ্চিত করা)। আপাতত এটা ল্যাবের যন্ত্রের চেয়ে বাদ্যযন্ত্রই বেশি, তবে লক্ষ্য হলো ফিল্টার চটপট পরীক্ষা করার জন্য একটা পকেট জেনারেটর।",
      ],
    },
  },
  {
    slug: "solo-soloing",
    eyebrow: "Music software",
    title: "solo-soloing",
    subtitle:
      "Jazz backing tracks on demand: Claude procedurally generates the Strudel code, then music theory checks catch its mistakes.",
    impact:
      "Every track has to pass nine music theory checks, and a failed check goes back to the stage that can fix it.",
    image: soloSoloingTitle,
    imageAlt:
      "Solo-Soloing: Not everyone has a band to play with all the time. This is your chance to practice soloing while solo.",
    extraImages: [
      {
        src: soloSoloingInterface,
        alt: "solo-soloing interface",
        altBn: "solo-soloing-এর ইন্টারফেস",
      },
    ],
    body: [
      "I built solo-soloing to give you a rhythm section of bass, piano, and drums to practice soloing over, so you don't need a band in the room. You pick a form and a key, and my FastAPI pipeline prompts Claude to procedurally generate each part as Strudel code, which plays back right in the browser.",
      "LLMs sound confident about music theory and are often wrong, so I built a nine-check verification suite that every track has to pass, covering key, form, register, and feel. A failed check is sent back to the pipeline stage that can actually fix it, with up to three retries per stage. The hardest part was style: a track can pass every theory check and still not sound like jazz. I kept the backend stateless, so it can serve more than one site at almost no hosting cost.",
    ],
    bn: {
      eyebrow: "মিউজিক সফটওয়্যার",
      title: "solo-soloing",
      subtitle:
        "চাহিদামতো জ্যাজ ব্যাকিং ট্র্যাক: Claude প্রসিডিউরালি Strudel কোড তৈরি করে, তারপর মিউজিক থিওরির চেক তার ভুল ধরে।",
      impact:
        "প্রতিটা ট্র্যাককে মিউজিক থিওরির নয়টা চেক পেরোতে হয়, আর কোনো চেক ফেল করলে সেটা সেই ধাপে ফেরত যায় যেটা ভুলটা ঠিক করতে পারে।",
      imageAlt:
        "Solo-Soloing: সবার তো সবসময় একসঙ্গে বাজানোর ব্যান্ড থাকে না। একা থেকেও সোলো প্র্যাকটিস করার সুযোগ এটাই।",
      body: [
        "solo-soloing আমি বানিয়েছি বেস, পিয়ানো আর ড্রামসের একটা রিদম সেকশন দেওয়ার জন্য, যার সঙ্গে সোলো প্র্যাকটিস করা যায়, ঘরে ব্যান্ড না থাকলেও চলে। আপনি একটা ফর্ম আর একটা স্কেল বেছে নেন, আর আমার FastAPI পাইপলাইন Claude-কে প্রম্পট করে প্রতিটা পার্ট Strudel কোড হিসেবে প্রসিডিউরালি তৈরি করায়, যেটা সরাসরি ব্রাউজারেই বাজে।",
        "LLM-গুলো মিউজিক থিওরি নিয়ে বেশ আত্মবিশ্বাসী শোনায়, কিন্তু প্রায়ই ভুল করে। তাই আমি নয়টা চেকের একটা যাচাই বানিয়েছি, যেটা প্রতিটা ট্র্যাককে পেরোতে হয়, যেখানে স্কেল, ফর্ম, রেজিস্টার আর ফিল দেখা হয়। কোনো চেক ফেল করলে সেটা পাইপলাইনের সেই ধাপে ফেরত যায় যেটা আসলে ভুলটা ঠিক করতে পারে, প্রতি ধাপে সর্বোচ্চ তিনবার। সবচেয়ে কঠিন ছিল স্টাইল: একটা ট্র্যাক থিওরির সব চেক পাস করেও জ্যাজের মতো না শোনাতে পারে। ব্যাকএন্ডটা স্টেটলেস রেখেছি, তাই প্রায় কোনো হোস্টিং খরচ ছাড়াই একাধিক সাইটে কাজ করতে পারে।",
      ],
    },
  },
  {
    slug: "marimba-research",
    eyebrow: "Research",
    title: "Toward a sustainable and accessible marimba",
    subtitle:
      "Screening 17 everyday materials as cheaper, more sustainable stand-ins for Honduran rosewood.",
    impact:
      "Presented at the Acoustical Society of America, accepted for publication in POMA, and covered on NPR.",
    image: marimbaSetup,
    paper: "/work/marimba-research/Bhattacharya_POMA_Marimba.pdf",
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
    bn: {
      eyebrow: "গবেষণা",
      title: "টেকসই ও সহজলভ্য মারিম্বার পথে",
      subtitle:
        "হন্ডুরান রোজউডের সস্তা ও আরও টেকসই বিকল্প হিসেবে ১৭টি সাধারণ উপাদান যাচাই।",
      impact:
        "Acoustical Society of America-তে উপস্থাপিত, POMA-তে প্রকাশের জন্য গৃহীত, আর NPR-এ এ নিয়ে প্রতিবেদন হয়েছে।",
      imageAlt:
        "ট্যাপ-রেসপন্স রেকর্ডিংয়ের সেটআপ: খোলা বাক্সের ভেতরে সুতোয় ঝোলানো একটা নমুনা বার, পাশে একটা মাইক্রোফোন",
      body: [
        "মারিম্বার বার ঐতিহ্যগতভাবে তৈরি হয় হন্ডুরান রোজউড দিয়ে, যার উষ্ণ সুর আর ধীরে মিলিয়ে যাওয়া আওয়াজের কদর অনেক। কিন্তু এই গাছ ধীরে বাড়ে, মাত্রাছাড়া কাটা হয়েছে, আর এর সঙ্গে অবৈধ পাচারও জড়িয়ে আছে, তাই দায়িত্বশীলভাবে জোগাড় করা কঠিন আর দামও অনেক। বড় কোনো নির্মাতার একটা সাধারণ ৪.৩ অক্টেভের রোজউড মারিম্বার দাম শুরুই হয় প্রায় ৭,০০০ ডলার থেকে। অনেক ছাত্রছাত্রী শুধু স্কুলের ভাগাভাগি করা যন্ত্রে সময় পায়, ফলে তারা বাড়িতে প্র্যাকটিস করতে পারা সহপাঠীদের থেকে পিছিয়ে পড়ে। ওয়েজাটা হাই স্কুলে সিনিয়র ইয়ারে, পদার্থবিদ্যা বা অ্যাকুস্টিকসের কোনো পূর্বজ্ঞান ছাড়াই, আমি এই প্রজেক্ট শুরু করি। আমি জানতে চেয়েছিলাম, সস্তা স্থানীয় উপাদান দিয়ে স্কুল আর কম টাকার বাদকদের নাগালে প্র্যাকটিসের যন্ত্র পৌঁছে দেওয়া যায় কি না।",
        "কোনো উপাদান বার হিসেবে কাজ করবে কি না, তা ঠিক করে তিনটি বৈশিষ্ট্য। ঘনত্ব মোটামুটি বোঝায় বারবার আঘাত সহ্য করার ক্ষমতা। ইয়ং গুণাঙ্ক, অর্থাৎ দৃঢ়তা, ঠিক করে বার বাজাতে কেমন লাগে আর এর ওভারটোন কীভাবে তৈরি হয়। লস ফ্যাক্টর ঠিক করে আওয়াজ কত তাড়াতাড়ি মিলিয়ে যায়, আর রোজউডের আওয়াজ ধীরে মেলায় বলেই রোলগুলো এমন গেয়ে ওঠে। নির্দিষ্ট আকারের একটা বারের পিচ ঠিক হয় দৃঢ়তা আর ঘনত্বের অনুপাত দিয়ে। যে উপাদানের অনুপাত রোজউডের সঙ্গে মেলে, তাতে বারের মাপও একই রাখা যায়, তাই তাতে প্র্যাকটিস করলে আসল যন্ত্রেও কাজে লাগবে। আমি দুটি মাপকাঠিতে উপাদান বাছাই করেছি: দৃঢ়তা-ঘনত্ব অনুপাত রোজউডের ২০%-এর মধ্যে, আর লস ফ্যাক্টর রোজউডের ৭৫%-এর মধ্যে। ওই ৭৫% ব্যবধান মোটামুটি রোজউড আর পাদাউকের মধ্যের পার্থক্য, যে কাঠ ইতিমধ্যেই মারিম্বায় ব্যবহার হয়।",
        "আমি তিনটি দলে ১৭টি উপাদান পরীক্ষা করেছি। নিরেট আমেরিকান কাঠের মধ্যে ছিল হিকরি, চেরি, মেপল, ওয়ালনাট, রেড ওক, হোয়াইট ওক, হোয়াইট অ্যাশ, পপলার, পাইন আর ফার। প্লাইউডের মধ্যে ছিল দুই ধরনের পাইন শিদিং, বাল্টিক বার্চ আর বাঁশ। প্লাস্টিক ছিল PLA আর PLA+, ৯৯.৯% ইনফিলে 3D-প্রিন্ট করা, যাতে নিরেট উপাদানের মতো আচরণ করে। পদ্ধতিটা ঠিকঠাক কাজ করছে কি না দেখতে পাদাউককে পজিটিভ কন্ট্রোল হিসেবে রাখা হয়েছিল। দুটো আলাদা গাছের দুটো চেরির নমুনা দেখিয়েছে একই প্রজাতির মধ্যেও কতটা তারতম্য থাকতে পারে। রোজউডের নমুনা কেনা খুব ব্যয়বহুল ছিল, তাই এর মানগুলো প্রকাশিত পরিমাপ থেকে নেওয়া।",
        "পদ্ধতিটা এমনভাবে বানিয়েছি যাতে ল্যাব ছাড়াই আবার করা যায়। ঘনত্ব মেপেছি একটা কিচেন স্কেল আর রুলার দিয়ে। জল সরিয়ে আয়তন মাপার পদ্ধতি বাদ দিয়েছি, কারণ কাঠ ভেজালে তার আর্দ্রতা বদলে যেত। অ্যাকুস্টিক বৈশিষ্ট্যের জন্য প্রতিটা বারকে দুই দিক খোলা একটা বাক্সের ভেতরে সুতোয় ঝুলিয়েছি, প্রথম বেন্ডিং মোডের নোডের কাছে, অর্থাৎ দুই প্রান্ত থেকে মোটামুটি এক-চতুর্থাংশ ভেতরে। তারপর ম্যালেটের কাঠের দিকটা দিয়ে টোকা দিয়ে মাইক্রোফোনে সেই অনুরণন রেকর্ড করেছি। Audacity-তে FFT করে পেয়েছি প্রতিটা বারের মৌলিক কম্পাঙ্ক। ঘনত্ব আর মাপের সঙ্গে মিলিয়ে সেই কম্পাঙ্ক থেকে পাওয়া যায় ইয়ং গুণাঙ্ক। লস ফ্যাক্টর এসেছে রেজোন্যান্স পিকের চূড়া থেকে ৩ dB নিচে তার প্রস্থকে পিক কম্পাঙ্ক দিয়ে ভাগ করে। একটা অ্যাক্সেলেরোমিটার লাগানোর কথা ভেবেছিলাম, কিন্তু তার নিজের ভরই সেই ড্যাম্পিং বদলে দিত যেটা আমি মাপতে চাইছিলাম। ল্যাব-মানের বিকল্প লেজার ভাইব্রোমেট্রি ছিল বাজেটের বাইরে। ডেটা গুছিয়েছি Google Sheets-এ, আর প্লট করেছি pandas আর matplotlib দিয়ে।",
        "রোজউড আর পাদাউক ছাড়া কোনো উপাদানই দুটো মাপকাঠি একসঙ্গে পেরোয়নি। পরীক্ষিত সবকিছুর মধ্যে প্লাস্টিকগুলো ছিল সবচেয়ে ঘন, কিন্তু ওজনের তুলনায় অনেক বেশি নমনীয়, ফলে তাদের পিচের আচরণ একেবারে বেঠিক হয়ে যায়। ছয়টি উপাদান পিচের সীমার মধ্যে পড়েছে (হিকরি, মেপল, ওয়ালনাট, চেরি আর দুটো পাইন প্লাইউড), কিন্তু প্রত্যেকটার আওয়াজ রোজউডের চেয়ে তাড়াতাড়ি মিলিয়ে যায়। ড্যাম্পিংয়ের মাপকাঠি পাদাউককে কেন্দ্র করে নতুন করে বসাতেই তালিকা ছোট হয়ে দাঁড়াল ফার, হিকরি আর চেরিতে। এরপর দৃঢ়তার পরীক্ষায় ফেল করায় আর খুব হালকা হওয়ায় ফার বাদ পড়ল।",
        "সবচেয়ে জোরালো দাবিদার হিকরি। এর ঘনত্ব, প্রায় ৭৯০ kg/m³, পাদাউক আর রোজউডের (৯৫০ kg/m³) মাঝামাঝি। এর দৃঢ়তা রোজউডের ১৬ GPa থেকে মোটামুটি এক গিগাপ্যাসকেলের তিন ভাগের এক ভাগের মধ্যে, আর এটা পিচের সীমার মধ্যেও পড়ে। এর দুর্বলতা ড্যাম্পিং। চেরি হালকা আর কম দৃঢ়, কিন্তু এর দৃঢ়তা-ঘনত্ব অনুপাত রোজউডের প্রায় ৭%-এর মধ্যে, তাই হালকা ব্যবহারের প্র্যাকটিস বারের জন্য এটা একটা সম্ভাবনা। আসল আকর্ষণ খরচে: গবেষণার সময় হন্ডুরান রোজউডের দাম ছিল প্রতি বোর্ড ফুট ৫৩ ডলার, যেখানে হিকরি ৮ ডলার আর চেরি ৬.২০ ডলার।",
        "এটা একটা প্রাথমিক বাছাইয়ের গবেষণা, তৈরি যন্ত্র নয়। এরপর আমি টিউন করা হিকরি আর চেরির বার কেটে, একই পিচের রোজউড আর পাদাউক বারের সঙ্গে সাসটেইন, ওভারটোন আর টেকসইতায় তুলনা করতে চাই। তার মধ্যে থাকবে পার্কাশনিস্টদের নিয়ে ব্লাইন্ড বাজানো ও শোনার পরীক্ষা, আর হিকরির ড্যাম্পিং কমাতে তাপীয় বা যান্ত্রিক প্রক্রিয়া নিয়ে পরীক্ষা। ফলাফল থেকে একটা কাজের ভাগাভাগিও বোঝা যায়। কনসার্ট মারিম্বার হয়তো রোজউডের যতটা সম্ভব কাছাকাছি মিল দরকার, কিন্তু প্র্যাকটিসের যন্ত্রের মূলত দরকার সাশ্রয়ী দাম, সুর ঠিক থাকা, আর বাজাতে যথেষ্ট কাছাকাছি অনুভূতি।",
        [
          "২০২৬ সালের মে মাসে ফিলাডেলফিয়ায় Acoustical Society of America-র ১৯০তম সভায় POMA Student Paper Competition-এর প্রতিযোগী হিসেবে আমি এই কাজ উপস্থাপন করেছি। পেপারটি Proceedings of Meetings on Acoustics-এ প্রকাশের জন্য গৃহীত হয়েছে। প্রজেক্টটি নিয়ে NPR-এর ",
          {
            text: "All Things Considered",
            href: "https://www.npr.org/programs/all-things-considered/2026/05/14/all-things-considered-for-may-14-2026",
          },
          " আর ",
          {
            text: "Short Wave",
            href: "https://www.npr.org/2026/05/14/nx-s1-5815265/this-week-in-science-sunscreen-from-fish-art-and-aging-and-a-sustainable-marimba",
          },
          "-এ প্রতিবেদনও হয়েছে।",
        ],
      ],
    },
  },
  {
    slug: "analog-ekg",
    eyebrow: "Biomedical hardware",
    title: "analog EKG",
    subtitle:
      "A heartbeat pulled out of millivolts at the skin, with three stages of analog circuitry.",
    impact:
      "Turns a 1–3 mV signal at the skin into a readable heartbeat, running on AA batteries, with heart rate estimated in MATLAB.",
    image: ekgBreadboard,
    imageAlt: "analog EKG circuit",
    extraImages: [
      {
        src: ekgSchematic,
        alt: "Hand-drawn schematic of the analog EKG circuit",
        altBn: "অ্যানালগ ইসিজি সার্কিটের হাতে আঁকা স্কিম্যাটিক",
      },
    ],
    body: [
      "I built this with a classmate in Circuits and Signals (EECE 2150). An AD627 instrumentation amplifier takes the 1–3 mV signal from the electrodes, rejects common-mode noise, and applies all of the gain (about 96). Two unity-gain active filters follow it. A 0.40 Hz high-pass strips the DC offset that electrodes pick up at the skin, and a 15.9 Hz low-pass cleans up noise, though it rounds off the sharpest part of the QRS complex. The whole circuit runs on ±1.5 V from AA batteries.",
      "The signal was digitized at 150 Hz on a 14-bit NI USB-6001 and processed in MATLAB. Processing used Butterworth low-pass filters, a bandstop around 60 Hz for mains hum, and a threshold detector that counts heartbeats to estimate heart rate. The QRS came out upside down in our recording, so the signal is flipped before detection.",
    ],
    bn: {
      eyebrow: "বায়োমেডিক্যাল হার্ডওয়্যার",
      title: "অ্যানালগ ইসিজি",
      subtitle:
        "ত্বকের কয়েক মিলিভোল্ট সংকেত থেকে হৃৎস্পন্দন বের করে আনা, তিন ধাপের অ্যানালগ সার্কিট দিয়ে।",
      impact:
        "ত্বকের ১–৩ mV সংকেতকে পড়ার মতো হৃৎস্পন্দনে পরিণত করে, চলে AA ব্যাটারিতে, আর MATLAB-এ হার্ট রেট আন্দাজ করা হয়।",
      imageAlt: "অ্যানালগ ইসিজি সার্কিট",
      body: [
        "Circuits and Signals (EECE 2150) কোর্সে এক সহপাঠীর সঙ্গে এটা বানিয়েছিলাম। একটা AD627 ইনস্ট্রুমেন্টেশন অ্যামপ্লিফায়ার ইলেকট্রোড থেকে ১–৩ mV সংকেত নেয়, কমন-মোড নয়েজ বাদ দেয়, আর পুরো গেইনটা (প্রায় ৯৬) দেয়। এর পরে আছে দুটো ইউনিটি-গেইন অ্যাক্টিভ ফিল্টার। ০.৪০ Hz-এর একটা হাই-পাস ত্বকে লাগানো ইলেকট্রোডে আসা DC অফসেট সরিয়ে দেয়, আর ১৫.৯ Hz-এর একটা লো-পাস নয়েজ পরিষ্কার করে, যদিও তাতে QRS কমপ্লেক্সের সবচেয়ে তীক্ষ্ণ অংশটা একটু গোল হয়ে যায়। পুরো সার্কিট চলে AA ব্যাটারির ±১.৫ V-এ।",
        "সংকেতটা ১৪-বিটের একটা NI USB-6001-এ ১৫০ Hz-এ ডিজিটাইজ করে MATLAB-এ প্রসেস করা হয়েছে। প্রসেসিংয়ে ছিল বাটারওয়ার্থ লো-পাস ফিল্টার, মেইনসের গুঞ্জনের জন্য ৬০ Hz-এর আশেপাশে একটা ব্যান্ডস্টপ, আর হৃৎস্পন্দন গুনে হার্ট রেট আন্দাজ করার জন্য একটা থ্রেশহোল্ড ডিটেক্টর। আমাদের রেকর্ডিংয়ে QRS উল্টো এসেছিল, তাই শনাক্ত করার আগে সংকেতটা উল্টে নেওয়া হয়।",
      ],
    },
  },
  {
    slug: "space-racing",
    eyebrow: "Game",
    title: "SPACE-RACING",
    subtitle: "An arcade game of laser targets and keypad interruptions.",
    impact:
      "Three I2C sensors on a single Raspberry Pi Pico register every laser hit, while a keypad interrupts play mid-round.",
    image: spaceRacingCabinet,
    imageAlt: "SPACE-RACING arcade game",
    extraImages: [
      {
        src: spaceRacingWiring,
        alt: "Sensor wiring inside the SPACE-RACING cabinet",
        altBn: "SPACE-RACING ক্যাবিনেটের ভেতরে সেন্সরের তার",
      },
    ],
    body: [
      "I built this for Cornerstone of Engineering in fall 2025. Indicator lights tell the player which of three targets to hit with a laser, and three I2C sensors read by a Raspberry Pi Pico register each hit. A second subsystem, an LCD and keypad, tracks score and time remaining. It also interrupts play with a code the player has to punch in before the game continues.",
      "It's written in MicroPython. Most of the work was in sensor thresholding, timing, and interrupt-driven transitions between game states.",
    ],
    bn: {
      eyebrow: "গেম",
      title: "SPACE-RACING",
      subtitle: "লেজার টার্গেট আর কিপ্যাডের বাধা নিয়ে একটা আর্কেড গেম।",
      impact:
        "একটা Raspberry Pi Pico-তে তিনটে I2C সেন্সর প্রতিটা লেজার হিট ধরে ফেলে, আর খেলার মাঝপথে কিপ্যাড বাধা দেয়।",
      imageAlt: "SPACE-RACING আর্কেড গেম",
      body: [
        "২০২৫ সালের ফল সেমিস্টারে Cornerstone of Engineering কোর্সের জন্য এটা বানিয়েছিলাম। ইন্ডিকেটর লাইট খেলোয়াড়কে জানায় তিনটে টার্গেটের কোনটায় লেজার মারতে হবে, আর তিনটে I2C সেন্সর, যেগুলো একটা Raspberry Pi Pico পড়ে, প্রতিটা হিট ধরে ফেলে। দ্বিতীয় একটা সাবসিস্টেম, একটা LCD আর কিপ্যাড, স্কোর আর বাকি সময়ের হিসাব রাখে। খেলার মাঝে এটা একটা কোডও দেখায়, যেটা টাইপ না করা পর্যন্ত খেলা আর এগোয় না।",
        "এটা MicroPython-এ লেখা। বেশিরভাগ কাজ ছিল সেন্সরের থ্রেশহোল্ড ঠিক করা, টাইমিং, আর গেমের এক অবস্থা থেকে আরেক অবস্থায় ইন্টারাপ্ট-চালিত বদল নিয়ে।",
      ],
    },
  },
  {
    slug: "escape-room-puzzle",
    eyebrow: "Embedded systems",
    title: "Escape room puzzle",
    subtitle: "Mix colors with buttons, then scan keycards in the right order.",
    impact:
      "Relative thresholds tuned from real readings let the color sensor tell blue keycards from green ones.",
    image: puzzleBox,
    imageAlt: "Escape room puzzle box",
    body: [
      "This was my team's puzzle for a class-wide escape room in Cornerstone of Engineering 2 (spring 2026), placed at the transition between the first and second rooms. It's housed in a wooden security box with a 3D-printed keypad enclosure and an LCD. First, players press four colored buttons together to mix new colors (red and blue make purple), working through orange, purple, and pink to earn a code. Then they scan three colored keycards past a color sensor in order (red, green, blue) to unlock a second code.",
      "I handled the electronics, component selection, and code. The puzzle runs on a Raspberry Pi Pico in MicroPython, with a TCS34725 sensor built for Arduino adapted to run alongside the LCD on its own I2C bus. Calibration took the most work. Red and green read cleanly, but blue barely registered above green, so detection uses relative thresholds tuned from real readings instead of fixed values.",
    ],
    bn: {
      eyebrow: "এমবেডেড সিস্টেম",
      title: "এস্কেপ রুম ধাঁধা",
      subtitle:
        "বোতাম টিপে রং মেশান, তারপর ঠিক ক্রমে কি-কার্ড স্ক্যান করুন।",
      impact:
        "আসল রিডিং দেখে ঠিক করা আপেক্ষিক থ্রেশহোল্ডের জন্য কালার সেন্সর নীল আর সবুজ কি-কার্ড আলাদা করে চিনতে পারে।",
      imageAlt: "এস্কেপ রুমের ধাঁধার বাক্স",
      body: [
        "Cornerstone of Engineering 2 (২০২৬ সালের স্প্রিং সেমিস্টার) কোর্সে পুরো ক্লাস মিলে বানানো একটা এস্কেপ রুমের জন্য এটা ছিল আমাদের দলের ধাঁধা, প্রথম আর দ্বিতীয় ঘরের মাঝখানে রাখা। এটা বসানো আছে একটা কাঠের সিকিউরিটি বাক্সে, সঙ্গে 3D-প্রিন্ট করা কিপ্যাডের খোল আর একটা LCD। প্রথমে খেলোয়াড়রা চারটে রঙিন বোতাম একসঙ্গে টিপে নতুন রং মেশায় (লাল আর নীল মিলে বেগুনি), কমলা, বেগুনি আর গোলাপি পেরিয়ে একটা কোড পায়। তারপর একটা কালার সেন্সরের সামনে দিয়ে ক্রমানুসারে (লাল, সবুজ, নীল) তিনটে রঙিন কি-কার্ড স্ক্যান করে দ্বিতীয় কোডটা খোলে।",
        "ইলেকট্রনিক্স, কম্পোনেন্ট বাছাই আর কোড ছিল আমার দায়িত্বে। ধাঁধাটা MicroPython-এ একটা Raspberry Pi Pico-তে চলে, আর Arduino-র জন্য তৈরি একটা TCS34725 সেন্সরকে মানিয়ে নিয়েছি যাতে সেটা নিজের I2C বাসে LCD-র পাশাপাশি চলে। সবচেয়ে বেশি খাটুনি গেছে ক্যালিব্রেশনে। লাল আর সবুজ পরিষ্কার পড়া যাচ্ছিল, কিন্তু নীল সবুজের চেয়ে সামান্যই বেশি ধরা পড়ছিল, তাই শনাক্ত করতে নির্দিষ্ট মানের বদলে আসল রিডিং দেখে ঠিক করা আপেক্ষিক থ্রেশহোল্ড ব্যবহার করা হয়।",
      ],
    },
  },
];

/** Pinned items lead the grid, so the pin can't drift if entries are reordered. */
export const WORK_ITEMS: WorkItem[] = [...ITEMS].sort(
  (a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false),
);

export function getWorkItem(slug: string): WorkItem | undefined {
  return WORK_ITEMS.find((item) => item.slug === slug);
}

export function getWorkCopy(item: WorkItem, isBengali: boolean): WorkCopy {
  return isBengali ? item.bn : item;
}
