"use client";

import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";
import { useEffect, useState } from "react";
import { useCarousel } from "@/_hooks/use-carousel";
import { CarouselButton } from "./carousel-button";

interface SeriesTrendingData {
  id: number;
  poster_path: string;
  href: string;
  name: string;
  vote_average: number;
  first_air_date: string;
}

export function SeriesTrending() {
  const {
    carouselRef,
    isLeftDisabled,
    isRightDisabled,
    scrollRight,
    scrollLeft
  } = useCarousel();
  const [seriesTrendingData, setSeriesTrendingData] = useState<
    SeriesTrendingData[]
  >([]);

  useEffect(() => {
    fetchSeriesTrending();
  }, []);

  async function fetchSeriesTrending() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeriesTrendingData(data.results);
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
        {seriesTrendingData.map((item) => (
          <Card
            key={item.id}
            poster_path={item.poster_path}
            name={item.name}
            vote_average={item.vote_average}
            first_air_date={item.first_air_date}
            id={item.id}
            href="/serie"
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
