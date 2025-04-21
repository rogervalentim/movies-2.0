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
    <div className="flex flex-col-reverse lg:flex-row border-[0.3px] border-[#333333]">
      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]  w-full lg:w-[50%] max-h-auto h-[500px]   items-start  border-r-[0.3px] border-[#333333]">
        <div className="w-[90%] flex flex-wrap gap-5 flex-col justify-center items-start px-4 h-[500px]">
          <h1 className="text-white text-3xl lg:text-5xl font-semibold ">
            {seasonData?.name}
          </h1>
          <p className="text-white/50 text-sm lg:text-base break-words w-full overflow-hidden whitespace-normal">
            {seasonData?.overview}
          </p>

          <Link
            href={`/collection/${id}`}
            className="w-[200px] flex justify-center items-center border border-transparent h-[45px] rounded-[3px] bg-white text-black hover:bg-black hover:text-white hover:border-white font-semibold"
          >
            Ver coleção
          </Link>
        </div>
      </div>
      <div className=" w-full lg:w-[50%]  h-[500px]">
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
