"use client";

import { apiKey } from "../../_utils/api-key";
import { useEffect, useState } from "react";
import { Card } from "./card";
import { useCarousel } from "@/_hooks/use-carousel";
import { CarouselButton } from "./carousel-button";

interface MoviesTrendingData {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesTrending() {
  const {
    carouselRef,
    scrollLeft,
    isLeftDisabled,
    scrollRight,
    isRightDisabled
  } = useCarousel();
  const [moviesTrendingData, setMoviesTrendingData] = useState<
    MoviesTrendingData[]
  >([]);

  useEffect(() => {
    fetchMoviesTrending();
  }, []);

  async function fetchMoviesTrending() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMoviesTrendingData(data.results);
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
        {moviesTrendingData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            release_date={item.release_date}
            href={`/movie`}
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
