"use client";

import Image from "next/image";
import IntroBody from "./IntroBody";
import IntroTitle from "./IntroTitle";

export default function MusicPulseSection() {
  return (
    <section className="relative overflow-hidden mx-auto w-full h-[1180px] xl:h-[875px] bg-[#030303]">
      {/* Blue glow blur effect */}
      <div className="absolute w-8 h-[1024px] top-[14px] left-[1298px] bg-[#006DFF] backdrop-blur-[300px] blur-[150px]" />

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center">
        <IntroTitle line1="Top songs" line2="From Nigeria" />

        <IntroBody
          title="Music Pulse"
          description="Daily updates on new releases, industry moves, and what your favorite artists are up to. No fluff, just real music stories"
        />

        <div>
          <div className="relative xl:hidden w-full mt-16 flex justify-center">
            <div className="relative w-[373px] h-auto">
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
                className="relative rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Cards container */}
          <div className="mt-6 xl:mt-16 flex justify-center items-center gap-6 relative">
            {/* Card 1 */}
            <Image
              src="/images/mpulse-card-1.png"
              alt="Asake Tweet Card"
              width={373}
              height={302}
              className="rounded-lg shadow-xl w-[273px] h-[202px] lg:w-[373px] lg:h-[302px]"
            />

            {/* Card 2 with badge */}
            <div className="relative hidden xl:block">
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
              className="rounded-lg shadow-xl w-[273px] h-[202px] lg:w-[373px] lg:h-[302px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
