import Image from "next/image";
import React from "react";

const IntroSection = ({ 
  title,
  description
}) => {
  return (
    <div className="relative z-20">
      {/* Cover Story Header */}
      <div className="text-center">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-white font-bold text-[32px] tracking-[-1px]">
            {title}
          </h2>
          <Image 
            src="/images/wave-line.svg" 
            alt="wave line"
            width={56} 
            height={25} 
          />
        </div>

        <p className="text-white/70 w-[606px] lg:w-[880px] max-w-4xl mx-auto font-dm-sans text-[18px] leading-[1.6]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default IntroSection;