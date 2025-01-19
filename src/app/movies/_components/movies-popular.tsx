"use client";

import { useEffect, useState } from "react";
import { useCarousel } from "@/_hooks/use-carousel";
import { CarouselButton } from "@/app/_components/carousel-button";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";

interface MoviesPopularData {
  id: number;
  poster_path: string;
  href: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesPopular() {
  const {
    carouselRef,
    scrollLeft,
    isLeftDisabled,
    scrollRight,
    isRightDisabled
  } = useCarousel();
  const [moviesPopular, setMoviesPopular] = useState<MoviesPopularData[]>([]);

  useEffect(() => {
    fetchMoviesPopular();
  }, []);

  async function fetchMoviesPopular() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesPopular(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section
        ref={carouselRef}
        className="flex items-center gap-9  overflow-x-scroll  lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        <CarouselButton
          direction="left"
          onClick={scrollLeft}
          disabled={isLeftDisabled}
        />
        {moviesPopular.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            id={item.id}
            href={"/movie"}
            release_date={item.release_date}
          />
        ))}
        <CarouselButton
          direction="right"
          onClick={scrollRight}
          disabled={isRightDisabled}
        />
      </section>
    </>
  );
}
