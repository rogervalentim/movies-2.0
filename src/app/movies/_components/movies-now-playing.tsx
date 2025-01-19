"use client";

import { useEffect, useState } from "react";
import { useCarousel } from "@/_hooks/use-carousel";
import { CarouselButton } from "@/app/_components/carousel-button";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";

interface MoviesNowPlayingData {
  id: number;
  href: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesNowPlaying() {
  const {
    carouselRef,
    scrollLeft,
    isLeftDisabled,
    scrollRight,
    isRightDisabled
  } = useCarousel();
  const [moviesNowPlayingData, setMoviesNowPlayingData] = useState<
    MoviesNowPlayingData[]
  >([]);

  useEffect(() => {
    fetchMoviesNowPlaying();
  }, []);

  async function fetchMoviesNowPlaying() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesNowPlayingData(data.results);
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
        {moviesNowPlayingData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            poster_path={item.poster_path}
            id={item.id}
            href={"/movie"}
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
