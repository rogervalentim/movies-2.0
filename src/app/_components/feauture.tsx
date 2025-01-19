"use client";

import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface FeatureDate {
  id: number;
  backdrop_path: string;
  poster_path: string;
  contentType: string;
  title?: string;
  name?: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  vote_average: number;
}

interface FeatureProps {
  contentType: string;
  href: string;
}

export function Feature({ contentType, href }: FeatureProps) {
  const [feature, setFeature] = useState<FeatureDate[]>([]);

  useEffect(() => {
    fetchMovieFeature();
  }, []);

  async function fetchMovieFeature() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const top4Movies = data.results.slice(0, 4);
        setFeature(top4Movies);
      } else {
        console.log("Nenhum filme encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
    }
  }

  return (
    <>
      {feature.map((movie) => (
        <Link
          href={`${href}/${movie.id}`}
          className="border border-[#333333] hover:border-white rounded-[3px]"
          title={movie?.title || movie?.name}
          key={movie?.overview}
        >
          <div className="relative h-[450px] w-full">
            <Image
              alt={movie?.title || movie?.name || ""}
              src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
              width={1280}
              height={780}
              className="object-cover object-center w-full h-full border border-[#333333] hover:border-white rounded-[3px]"
            />
            <div className="absolute inset-0 w-full h-[600px] object-cover filter blur-sm" />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col gap-4 items-center px-10 justify-center">
              <h1 className="text-4xl text-white font-bold">
                {" "}
                {movie?.title || movie?.name}
              </h1>
              <p className="line-clamp-3 text-lg  text-center text-white/80">
                {" "}
                {movie?.overview}
              </p>

              <Button
                title="Ver detalhes"
                viewDetails={`Ver detalhes ${movie?.title || movie?.name}`}
              />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
