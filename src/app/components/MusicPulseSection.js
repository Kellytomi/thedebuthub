"use client";

import Image from "next/image";
import IntroBody from "./IntroBody";
import IntroTitle from "./IntroTitle";

export default function MusicPulseSection() {
  return (
    <section className="relative overflow-hidden mx-auto w-full h-[875px] bg-[#030303]">
      {/* Blue glow blur effect */}
      <div className="absolute w-8 h-[1024px] top-[14px] left-[1298px] bg-[#006DFF] backdrop-blur-[300px] blur-[150px]" />

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center">
        <IntroTitle line1="Top songs" line2="From Nigeria" />

        <IntroBody
          title="Music Pulse"
          description="Daily updates on new releases, industry moves, and what your favorite artists are up to. No fluff, just real music stories"
        />

        {/* Cards container */}
        <div className="mt-16 flex justify-center items-center gap-6 relative">
          {/* Card 1 */}
          <Image
            src="/images/mpulse-card-1.png"
            alt="Asake Tweet Card"
            width={373}
            height={302}
            className="rounded-lg shadow-xl"
          />

          {/* Card 2 with badge */}
          <div className="relative">
            {/* Badge */}
            <Image
              src="/images/best-todo.svg"
              alt="Badge"
              width={100}
              height={100}
              className="absolute -top-12 -right-12 z-10"
            />
            <Image
              src="/images/mpulse-card-main.png"
              alt="Rema Tweet Card"
              width={373}
              height={372}
              className="rounded-lg shadow-2xl"
            />
          </div>

          {/* Card 3 */}
          <Image
            src="/images/mpulse-card-2.png"
            alt="Crayon Tweet Card"
            width={373}
            height={302}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
