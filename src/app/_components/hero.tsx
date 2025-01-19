"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../../_utils/api-key";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  contentType: string;
  href: string;
}

interface Data {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  overview: string;
  backdrop_path: string;
}

export function Hero({ contentType, href }: HeroProps) {
  const [movie, setMovie] = useState<Data | null>(null);

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
    <Link href={`${href}/${movie?.id}`} className="relative h-screen w-full">
      <Image
        alt={movie?.title || movie?.name || ""}
        src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
        width={1280}
        height={780}
        className="object-cover object-center w-full h-full border border-[#333333] hover:border-white rounded-[3px]"
      />
      <div className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex flex-col gap-4 items-center px-10 lg:px-40 justify-center">
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
    </Link>
  );
}
