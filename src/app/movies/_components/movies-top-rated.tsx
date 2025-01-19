"use client";

import { useEffect, useState } from "react";
import { useCarousel } from "@/_hooks/use-carousel";
import { CarouselButton } from "@/app/_components/carousel-button";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";

interface MoviesTopRatedData {
  id: number;
  poster_path: string;
  href: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesTopRated() {
  const {
    carouselRef,
    scrollLeft,
    isLeftDisabled,
    scrollRight,
    isRightDisabled
  } = useCarousel();
  const [moviesTopRated, setMoviesTopRated] = useState<MoviesTopRatedData[]>(
    []
  );

  useEffect(() => {
    fetchMoviesNowPlaying();
  }, []);

  async function fetchMoviesNowPlaying() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesTopRated(data.results);
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
        {moviesTopRated.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            id={item.id}
            href={"/movie"}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
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
