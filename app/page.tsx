import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main className="relative z-10">
      <div className="relative min-h-screen">
        <Hero />

        {/* Marquee — sits low on the page; no z-index so mix-blend can reach Hero/portrait behind it */}
        <div className="absolute bottom-[8%] md:bottom-[10%] left-0 right-0">
          <Marquee />
        </div>
      </div>
    </main>
  );
}
