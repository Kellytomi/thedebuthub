"use client";

import { IntroBody, FlankDecoration } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

  export default function SocialsSection() {
    const socialLinks = [
      {
        name: "Twitter",
        url: "https://x.com/thedebuthub?s=21",
        icon: "/socials/twitter-icon.svg",
        transform: "",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/thedebuthub?igsh=bnkwdmdjdzNuZmF6",
        icon: "/socials/instagram-icon.svg",
        transform: "transform -rotate-12",
      },
      {
        name: "Facebook",
        url: "https://web.facebook.com/people/The-Debut-Hub/61567008111041/?__mmr=1&_rdc=1&_rdr",
        icon: "/socials/facebook-icon.svg",
        transform: "",
      },
      {
        name: "TikTok",
        url: "https://www.tiktok.com/@thedebuthub",
        icon: "/socials/tiktok-icon.svg",
        transform: "transform -rotate-25 sm:-rotate-0",
      },
      {
        name: "Gmail",
        url: "mailto:thedebuthub@gmail.com",
        icon: "/socials/gmail-icon.svg",
        transform: "transform rotate-12 sm:-rotate-0",
      },
    ];

    return (
      <section className="relative overflow-hidden mx-auto w-full h-[765px] bg-[#030303] pt-20">
        <IntroBody
          title="Our Socials"
          description="Be the first to know about chart updates, exclusive artist drops, behind-the-scenes content, and live sessions."
        />
        <FlankDecoration />
        <div className="relative z-20 flex flex-col items-center mt-12 sm:mt-28 text-white/80 font-dm-sans text-[18px]">
          <div className="flex flex-col gap-8 sm:gap-28 mb-8 justify-center items-center">
            <div className="flex flex-col md:flex-row gap-8 md:gap-14">
              {socialLinks.slice(0, 3).map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className={`flex items-center gap-2 bg-gradient-to-b from-[#1A1A1A] to-[#141414] p-2 rounded-lg border-[1px] border-white/8 hover:text-white hover:-translate-y-3 hover:border-[#00ccff]/50 hover:shadow-[0_0_20px_rgba(0,204,255,0.3)] transition-all duration-300 ${social.transform}`}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <span className="text-2xl">{social.name}</span>
                </Link>
              ))}
            </div>
            <div className="flex gap-5 sm:gap-14">
              {socialLinks.slice(3).map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className={`flex items-center gap-2 bg-gradient-to-b from-[#1A1A1A] to-[#141414] p-2 rounded-lg border-[1px] border-white/8 hover:text-white hover:-translate-y-3 hover:border-[#00ccff]/50 hover:shadow-[0_0_20px_rgba(0,204,255,0.3)] transition-all duration-300 ${social.transform}`}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <span className="text-2xl">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
