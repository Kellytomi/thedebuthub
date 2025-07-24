"use client";

import Image from "next/image";
import IntroBody from "./IntroBody";
import IntroTitle from "./IntroTitle";

export default function CoverStorySection() {
  return (
    <section className="relative overflow-hidden mx-auto w-full h-[1280px] xl:h-[1024px] bg-[#030303]">
      <div className="absolute w-8 h-[1024px] top-[14px] left-[1298px] bg-[#006DFF] backdrop-blur-[300px] blur-[150px]" />

      <div className="relative z-10 h-full">
        <IntroTitle line1="Where words fail," line2="Music speaks" />

        <IntroBody title ="Cover Story" description = "Meet the artist who broke the charts this week. Get an exclusive look into their journey, inspirations, and what's next for them." />

        <div className="flex flex-col xl:flex-row items-center justify-center px-16 mt-16 gap-16">
          <div
            className="relative"
            style={{
              height: "427px",
              width: "360px",
            }}
          >
            <div className="w-full h-full overflow-hidden relative">
              <Image
                src="/images/wiz-image.png"
                alt="Main Artist"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="absolute inset-0"
              />
            </div>

            <div className="absolute w-full inset-0">
              <Image
                src="/images/tp-artiste.svg"
                alt="Main Artist"
                height={100}
                width={100}
                className="absolute -top-12 -left-12"
              />
            </div>
          </div>

          <div className="flex-1 max-w-xl">
            <h3 className="text-white font-bold mb-6 font-montserrat text-[32px] tracking-[-0.5px]">
              Details about artist's song
            </h3>

            <p className="text-white/70 mb-8 leading-[1.8] font-dm-sans text-[16px]">
              This week's chartbreaker is ZAYA, a 24-year-old alt-R&B artist
              whose debut album, Silk Notes, just hit #1 on DebutHub's New Vibes
              Chart. Written over six months between Lagos and London, the
              9-track project blends soul, Afrobeats, and chillwave. ZAYA says
              the album is "a love letter to late nights, soft healing, and
              second chances."
            </p>

            <button className="text-white font-semibold relative overflow-hidden hover:scale-105 transition-transform w-[160px] h-[50px] rounded-[6px] bg-gradient-to-b from-[#006DFF] to-[#004199] shadow-[0px_2px_7px_0px_rgba(87,87,87,0.17)] font-dm-sans text-[14px] px-4 py-2">
              <div className="absolute inset-0 rounded-md p-px bg-gradient-to-b from-[#338AFF] to-[#003883] -z-10">
                <div className="w-full h-full rounded-md bg-gradient-to-b from-[#006DFF] to-[#004199]" />
              </div>
              Read more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
