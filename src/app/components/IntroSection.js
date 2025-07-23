import Image from "next/image";
import React from "react";

const IntroSection = () => {
  return (
    <div>
      <div className="text-center pt-16 mb-12">
        <p
          className="italic font-dancing-script text-[32px]"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span className="text-[#646464]">Where words fail,</span>
          <br />
          <span className="text-white/80">Music speaks</span>
        </p>
      </div>

      {/* Cover Story Header */}
      <div className="text-center mb-16">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-white font-bold font-montserrat text-[32px] tracking-[-1px]">
            Cover Story
          </h2>
          <Image 
            src="/images/wave-line.svg" 
            alt="wave line"
            width={56} 
            height={25} 
          />
        </div>

        <p className="text-white/70 max-w-4xl mx-auto font-dm-sans text-[18px] leading-[1.6]">
          Meet the artist who broke the charts this week. Get an exclusive look
          into their
          <br />
          journey, inspirations, and what's next for them.
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
