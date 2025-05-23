"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../../_utils/api-key";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/_utils/format-date";
import { RenderStars } from "@/utils/render-stars";
import { MovieDetailsData } from "@/types";

interface HeroProps {
  contentType: string;
  href: string;
}

export function Hero({ contentType, href }: HeroProps) {
  const [movie, setMovie] = useState<MovieDetailsData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${contentType}/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMovie(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="lg:hidden flex flex-col  gap-4 container py-8 bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
        <Image
          src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
          alt="image"
          width={0}
          height={0}
          key={movie?.id}
          quality={100}
          sizes="100vh"
          className="w-full h-full object-cover border border-[#333333] rounded-[3px]"
        />

        {contentType === "movie" && (
          <p className="text-slate-400 text-sm  leading-relaxed">
            {formatDate(movie?.release_date ?? "")}
          </p>
        )}
        {contentType === "tv" && (
          <p className="text-slate-400 text-sm  leading-relaxed">
            {formatDate(movie?.first_air_date ?? "")}
          </p>
        )}

        <h1 className="text-white font-bold text-xl md:text-3xl leading-tight">
          {movie?.title || movie?.name || "Título Indisponível"}
        </h1>

        <div className="flex items-center gap-3">
          <span className=" flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold shadow-md">
            {movie?.vote_average?.toFixed(1)}
          </span>
          <span
            className={`w-fit px-3 py-1 rounded-full text-sm font-semibold text-black shadow ${
              (movie?.vote_average ?? 0) >= 7
                ? "bg-green-400 border-2 border-green-950"
                : (movie?.vote_average ?? 0) >= 5
                  ? "bg-yellow-400 border-2 border-yellow-950"
                  : "bg-red-400 border-2 border-red-950"
            }`}
          >
            {(movie?.vote_average ?? 0).toFixed(1)}
          </span>
        </div>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {movie?.overview || "Nenhuma descrição disponível para este filme."}
        </p>

        <Link
          href={`${href}/${movie?.id}`}
          className="w-[200px] flex justify-center items-center border border-transparent h-[45px] rounded-[3px] bg-white text-black hover:bg-black hover:text-white hover:border-white font-semibold"
        >
          Ver Detalhes
        </Link>
      </div>
      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
        <div className="relative h-full  hidden lg:flex justify-between container py-6">
          <div className="relative w-full h-[500px] hidden lg:flex justify-between  gap-[1.95em] items-center">
            <div className="w-[40%] h-full flex items-center justify-center">
              <div className="flex flex-col gap-4">
                {contentType === "movie" && (
                  <p className="text-slate-400 text-sm  leading-relaxed">
                    {formatDate(movie?.release_date ?? "")}
                  </p>
                )}

                {contentType === "tv" && (
                  <p className="text-slate-400 text-sm  leading-relaxed">
                    {formatDate(movie?.first_air_date ?? "")}
                  </p>
                )}
                <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight">
                  {movie?.title || movie?.name || "Título Indisponível"}
                </h1>

                <div className="flex items-center gap-3">
                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-semibold text-black shadow ${
                      (movie?.vote_average ?? 0) >= 7
                        ? "bg-green-400 border-2 border-green-950"
                        : (movie?.vote_average ?? 0) >= 5
                          ? "bg-yellow-400 border-2 border-yellow-950"
                          : "bg-red-400 border-2 border-red-950"
                    }`}
                  >
                    {(movie?.vote_average ?? 0).toFixed(1)}
                  </span>
                  <span className="flex">
                    {RenderStars(movie?.vote_average)}
                  </span>
                </div>
                <p className="text-slate-400 text-base  leading-relaxed">
                  {movie?.overview ||
                    "Nenhuma descrição disponível para este filme."}
                </p>

                <Link
                  href={`${href}/${movie?.id}`}
                  className="w-[200px] flex justify-center items-center border border-transparent h-[45px] rounded-[3px] bg-white text-black hover:bg-black hover:text-white hover:border-white font-semibold"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>

            <div className="relative w-[60%] h-[500px]">
              <div
                className="w-full h-[500px] bg-cover bg-center rounded-lg border border-[#333333]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path})`
                }}
              ></div>
              <div
                className="absolute bottom-4 left-4 w-40 h-56 bg-cover rounded-lg border border-[#333333]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
