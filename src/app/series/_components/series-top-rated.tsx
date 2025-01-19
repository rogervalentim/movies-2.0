"use client";

import { useEffect, useState } from "react";
import { useCarousel } from "@/_hooks/use-carousel";
import { CarouselButton } from "@/app/_components/carousel-button";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";

interface SeriesTopRatedData {
  id: number;
  poster_path: string;
  href: string;
  name: string;
  vote_average: number;
  first_air_date: string;
}

export function SeriesTopRated() {
  const {
    carouselRef,
    scrollLeft,
    isLeftDisabled,
    scrollRight,
    isRightDisabled
  } = useCarousel();
  const [seriesTopRated, setSeriesTopRated] = useState<SeriesTopRatedData[]>(
    []
  );

  useEffect(() => {
    fetchSeriesTopRated();
  }, []);

  async function fetchSeriesTopRated() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeriesTopRated(data.results);
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
        {seriesTopRated.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            id={item.id}
            href="/serie"
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            first_air_date={item.first_air_date}
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
