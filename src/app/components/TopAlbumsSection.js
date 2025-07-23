"use client";

import { useState, useRef } from "react";
import AlbumCard from "./AlbumCard";
import Image from "next/image";

export default function TopAlbumsSection() {
  const albums = [
    {
      id: 1,
      title: "You’ll be alright, kid (Chapter 1)",
      artist: "Alex Warren",
      cover: "/images/album1.png",
      tracks: "24 tracks",
    },
    {
      id: 2,
      title: "Manchild",
      artist: "Sabrina Carpenter",
      cover: "/images/album2.png",
      tracks: "12 tracks",
    },
    {
      id: 3,
      title: "Love, Damini",
      artist: "Burna Boy",
      cover: "/images/album3.png",
      tracks: "21 tracks",
    },
  ];
  return (
    <section
      className="flex flex-col gap-10 relative overflow-hidden py-10"
      style={{
        width: "100%",
        // maxWidth: '1440px',
        height: "666px",
        backgroundColor: "#040507",
      }}
    >
      <div className="w-full text-center">
        <h2
          className="mb-8 text-lg flex flex-col"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
          }}
        >
          <span style={{ color: "#646464" }}>Top Albums</span>{" "}
          <span className="text-white">This week</span>
        </h2>
      </div>
      <div className="flex justify-center gap-[33px] items-center h-auto">
        {albums.map((album) => (
          <div key={album.id}>
            <div className="flex flex-col w-[370px] h-[418px] gap-2">
              <Image
                src={album.cover}
                alt={album.title}
                width={370}
                height={350}
              />
              <div className="text-[20px] flex flex-col gap-1">
                {album.title}
                <div className="text-[14px] text-[#CCCCCC] flex gap-4 items-center">
                  {album.artist} <div className="w-1 h-1 rounded-full bg-[#2C2C2C]" /> {album.tracks}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
