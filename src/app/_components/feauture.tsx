"use client";

import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FeatureDate {
  id: number;
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
          <div className="h-[500px] w-full border border-[#333333] rounded-[3px] hover:border-white hover:brightness-75">
            <Image
              alt={movie?.title || movie?.name || ""}
              width={0}
              height={0}
              src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
              quality={100}
              sizes="100vh"
              className="w-full h-full"
            />
          </div>
        </Link>
      ))}
    </>
  );
}
