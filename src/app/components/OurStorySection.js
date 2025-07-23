"use client";

import AlbumCard from "./AlbumCard";

export default function TopAlbumsSection() {
  const albums = [
    {
      id: 1,
      title: "You’ll be alright, kid (Chapter 1)",
      artist: "Alex Warren",
      cover: "/images/album1.png",
      duration: "02:38"
    },
    {
      id: 2,
      title: "Manchild",
      artist: "Sabrina Carpenter",
      cover: "/images/album2.png",
      duration: "02:38"
    },
    {
      id: 3,
      title: "Love, Damini",
      artist: "Burna Boy",
      cover: "/images/album3.png",
      duration: "02:38"
    },
  ];

  return (
    <section
      className="flex flex-col gap-10 relative overflow-hidden py-10"
      style={{
        width: "100%",
        height: "666px",
        backgroundColor: "#040507",
      }}
    >
      <div className="w-full text-center">
        <h2
          className="mb-12 text-lg flex flex-col"
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
          <AlbumCard
            key={album.id}
            cover={album.cover}
            title={album.title}
            artist={album.artist}
            duration={album.duration}
          />
        ))}
      </div>
    </section>
  );
}