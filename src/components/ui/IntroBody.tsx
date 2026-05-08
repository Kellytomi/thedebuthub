import Image from "next/image";
import React from "react";

const IntroSection = ({ 
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="relative z-20">
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
            sizes="56px"
            style={{ width: "56px", height: "25px" }}
          />
        </div>

        <p className="text-white/70 w-full max-w-[350px] md:max-w-[606px] lg:max-w-[880px] mx-auto px-4 font-dm-sans text-[18px] leading-[1.6]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
