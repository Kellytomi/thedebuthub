"use client";

import React from "react";
import Image from "next/image";
import Footer from "./Footer";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#040507] to-[#040507f8]">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/grid-layers.svg"
          alt="grid pattern background"
          width={36}
          height={39}
          priority
          style={{
            position: "absolute",
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Header Navigation */}
      <div className="fixed top-4 sm:top-8 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/The Debut Hub.png"
              alt="The Debut Hub Logo"
              width={48}
              height={52}
              priority
              className="w-9 h-10 sm:w-12 sm:h-14 object-contain"
            />
          </Link>

          <div className="flex items-center">
            {/* Subscribe Button - Links to Twitter */}
            <a
              href="https://twitter.com/thedebuthub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white font-medium relative overflow-hidden text-xs sm:text-sm px-3 py-2 sm:px-4 rounded-md h-8 sm:h-9 font-dm-sans inline-flex items-center justify-center transition-colors duration-200"
              style={{
                background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                boxShadow: "0px 2px 7px 0px rgba(87, 87, 87, 0.17)",
              }}
            >
              {/* Border gradient overlay */}
              <div
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background:
                    "linear-gradient(180deg, #242424 0%, #070707 100%)",
                  zIndex: -1,
                }}
              >
                <div
                  className="w-full h-full rounded-md"
                  style={{
                    background: `linear-gradient(180deg, #1F1F1F 0%, #080808 100%), linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 109, 255, 0.08) 100%)`,
                  }}
                />
              </div>
              Subscribe
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative pt-20 sm:pt-24">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}