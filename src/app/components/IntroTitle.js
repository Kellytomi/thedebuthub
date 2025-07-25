import React from "react";

const IntroTitle = ({ 
  line1, 
  line2 
}) => {
  return (
    <div className="text-center pt-16 mb-6 md:mb-24">
      <p
        className="italic font-dancing-script text-[32px]"
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "24px",
        }}
      >
        <span className="text-[#646464]">{line1}</span>
        <br />
        <span className="text-white/80">{line2}</span>
      </p>
    </div>
  );
};

export default IntroTitle;