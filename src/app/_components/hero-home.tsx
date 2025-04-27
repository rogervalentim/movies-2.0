"use client";

import { useEffect, useState } from "react";
import { apiKey } from "../../_utils/api-key";
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

export function HeroHome({ contentType, href }: HeroProps) {
  const [movies, setMovies] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/${contentType}/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
      <div className=" container h-[100%] py-20">
        <div className="flex flex-col justify-center space-y-4 items-center gap-[1.95em]">
          {/* Texto introdutório */}
          <div className="text-white text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Descubra os Filmes e Séries Mais Populares!
            </h1>
            <p className="text-slate-400   text-base lg:text-lg">
              Explore os títulos que estão em alta! Confira os filmes e séries
              <br />
              mais assistidos do momento e fique por dentro dos sucessos que{" "}
              <br /> todo mundo está comentando. Não perca nenhuma novidade!
            </p>
            <div className="flex justify-center flex-wrap gap-[1.95em] relative">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`${href}/${movie.id}`}
                  title={movie.name}
                  className="flex justify-center gap-4 items-center mt-4 transform transition-transform duration-500"
                >
                  <div
                    className="w-32 h-48 bg-cover rounded-lg border border-[#333333]"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`
                    }}
                  ></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Filmes em destaque */}
        </div>
      </div>
    </div>
  );
}
