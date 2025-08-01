import Image from 'next/image'
import React from 'react'

const FlankDecoration = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
        <div className="relative max-w-[1440px] h-full mx-auto">
          <div>
            <Image
              src="/images/decoration-top.svg"
              alt="Top decoration"
              width={121}
              height={88}
              loading="lazy"
              sizes="121px"
              className="absolute top-10 left-2 md:left-10 xl:left-0 rounded-lg"
              style={{
                aspectRatio: '121/88',
                objectFit: 'contain'
              }}
            />
          </div>
          <div>
            <Image
              src="/images/decoration-bottom.svg"
              alt="Bottom decoration"
              width={121}
              height={88}
              loading="lazy"
              sizes="121px"
              className="absolute rounded-lg bottom-0 md:bottom-20 right-2 md:right-10 xl:right-0"
              style={{
                aspectRatio: '121/88',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>
  )
}

export default FlankDecoration