import { Play } from "iconsax-react";
import Image from "next/image";

export default function AlbumCard({ cover, title, artist, duration }) {
  return (
    <div className="group relative flex flex-col w-[370px] h-[418px] gap-2 cursor-pointer">
      
      <div className="relative w-full h-[350px] overflow-hidden rounded-md">
        <Image
          src={cover}
          alt={title}
          width={370}
          height={350}
          className="object-cover w-full h-full rounded-md"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
            <Play size="42" color="black" variant="TwoTone" />
          </div>
        </div>
      </div>

      <div className="text-[20px] flex flex-col gap-1 text-white">
        {title}
        <div className="text-[14px] text-[#CCCCCC] flex gap-4 items-center">
          {artist}
          <div className="w-1 h-1 rounded-full bg-[#2C2C2C]" />
          {duration}
        </div>
      </div>
    </div>
  );
}