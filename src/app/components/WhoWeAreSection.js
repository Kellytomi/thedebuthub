"use client";

import IntroBody from "./IntroBody";
import ActionButton from "./ActionButton";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <section className="relative overflow-hidden mx-auto w-full h-[665px] bg-[#030303] pt-20">
      <Image
        src="/images/star-section-decor.svg"
        alt="grid pattern background"
        width={36}
        height={39}
        priority
        className="absolute w-full h-auto object-contain top-0 left-0 z-0"
      />
      <div className="relative w-full h-full bg-black/50">
        <IntroBody
          title="Empowering Sound. Elevating Stories"
          description="DebutHub is a global music community built by artists, for artists. We believe in authenticity, creativity, and giving power back to creators"
        />

        <div className="max-w-[1350px] mx-auto flex h-auto pt-16 gap-20">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2 className="text-[32px] text-white font-medium">Who We Are</h2>
            <p className="text-white/70 w-[526px] font-dm-sans text-[20px]">
              We’re on a mission to amplify voices in music — whether you're
              just starting or hitting milestones. Join us in reshaping the
              music landscap
            </p>
            <ActionButton onClick={() => alert("Action triggered!")}>
              Know More
            </ActionButton>
          </div>
          <div>
            <div className="">
              <Image
                src="/images/tdh-section-pt.svg"
                alt="Asake Tweet Card"
                width={740}
                height={367}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
