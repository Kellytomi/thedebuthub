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
      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center w-full h-full text-center z-20">
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
            className="text-white font-bold mb-8"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: "1.1",
              letterSpacing: "-2px",
            }}
          >
            Stay Informed
          </h2>
          <p
            className="text-white/70 max-w-[741px]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Get the latest in music news, exclusive features, and insider tips
            delivered straight to your inbox
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-24">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-[375px] flex-1 px-6 py-4 bg-[#252525]/30 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            <ActionButton onClick={() => alert("Action triggered!")}>
              Subscribe
            </ActionButton>
          </div>

          {isSubscribed && (
            <div className="mt-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
              <p className="text-green-400 font-medium">
                ✓ Thank you for subscribing! You'll hear from us soon.
              </p>
            </div>
          )}
        </form>
        <div className="flex flex-col gap-12">
          <div className="flex gap-20">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[18px] hover:text-[#B3B3B3] text-white transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <p className="text-[#92989F] text-[16px]">© {new Date().getFullYear()} The Debut Hub. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
