"use client";

import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SeasonProps {
  id: number;
  seasonNumber: number;
}

interface SeasonData {
  episode_count: number;
  id: number;
  name: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  season_number: number;
}

export function Seasons({ id, seasonNumber }: SeasonProps) {
  const [seasonData, setSeasonData] = useState<SeasonData | null>(null);

  useEffect(() => {
    fetchSeason();
  }, []);

  async function fetchSeason() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeasonData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex border-[0.3px] border-[#333333]">
      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]  w-full lg:w-[50%] h-[500px] flex gap-5 px-10 items-start lg:border-r-[0.3px] lg:border-[#333333] justify-center  flex-col">
        <h1 className="text-white text-5xl font-semibold">
          {seasonData?.name}
        </h1>
        <p className="text-white/50 text-base">{seasonData?.overview}</p>
        <Link
          //   href={`/collection/${id}`}
          href="/"
          className="w-[200px] flex justify-center items-center border border-transparent h-[45px] rounded-[3px] bg-white text-black hover:bg-black hover:text-white hover:border-white font-semibold"
        >
          Ver Temporadas
        </Link>
      </div>
      <div className=" w-full lg:w-[50%]  h-[500px] hidden lg:block">
        <Image
          src={`https://image.tmdb.org/t/p/w780${seasonData?.poster_path}`}
          alt={seasonData?.name ?? ""}
          title={seasonData?.name}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="w-full h-[500px]"
        />
      </div>
    </div>
  );
}
