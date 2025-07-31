"use client";

import Image from "next/image";
import { useState } from "react";
import ActionButton from "./ActionButton";
import Link from "next/link";

export default function StayInformedSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      // Here you would typically handle the newsletter subscription
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = [
    { name: "Service", href: "#" },
    { name: "Support", href: "#" },
    { name: "Company", href: "#" },
    { name: "Legal", href: "#" },
    { name: "Join Us", href: "#" },
  ];

  return (
    <section className="relative bg-black h-[1076px]">
      <Image
        src="/images/grid-layers.svg"
        alt="grid pattern background"
        width={36}
        height={39}
        priority
        className="absolute w-full h-full lg:h-[1076px] object-cover lg:object-contain top-0 left-0 z-0"
      />
      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center w-full h-full text-center z-20 px-4">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center rounded-full mb-6">
            <Image
              src="/images/top-game-badge.svg"
              alt="Main Artist"
              height={100}
              width={100}
              className=""
            />
          </div>

          <h2
            className="mb-8 text-lg"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "24px",
            }}
          >
            <span style={{ color: "#646464" }}>Your</span>{" "}
            <span className="text-white">Sound,</span>{" "}
            <span style={{ color: "#646464" }}>Your</span>{" "}
            <span className="text-white">Story,</span>{" "}
            <span style={{ color: "#646464" }}>Your</span>{" "}
            <span className="text-white">Stage</span>
          </h2>

          <h2
            className="text-white font-bold mb-8 font-montserrat leading-none tracking-tight"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
            }}
          >
            Stay Informed
          </h2>
          <p className="text-white/70 max-w-[741px] font-dm-sans text-lg leading-relaxed">
            Get the latest in music news, exclusive features, and insider tips
            delivered straight to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto mb-24 px-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full sm:flex-1 px-6 py-4 bg-[#252525]/30 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            <ActionButton onClick={() => alert("Action triggered!")}>
              Subscribe
            </ActionButton>
          </div>

          {isSubscribed && (
            <div className="mt-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
              <p className="text-green-400 font-medium">
                ✓ Thank you for subscribing! You&apos;ll hear from us soon.
              </p>
            </div>
          )}
        </form>
        <div className="flex flex-col gap-12 w-full px-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-20">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base sm:text-[18px] hover:text-[#B3B3B3] text-white transition-colors font-medium whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-[#92989F] text-sm sm:text-[16px]">© {new Date().getFullYear()} The Debut Hub. All rights reserved.</p>
          <p className="text-[#92989F]/60 text-xs">
            Designed by{" "}
            <a 
              href="https://x.com/kemsdesigns" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#92989F]/80 hover:text-white transition-colors underline"
            >
              Kems Designs
            </a>
            {" "}and developed by{" "}
            <a 
              href="https://x.com/kelvin_dart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#92989F]/80 hover:text-white transition-colors underline"
            >
              Etoma.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}