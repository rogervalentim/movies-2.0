"use client";

import { apiKey } from "@/_utils/api-key";
import { useEffect, useState } from "react";
import { Card } from "./card";
import { CarouselButton } from "./carousel-button";
import { useCarousel } from "@/_hooks/use-carousel";

interface SimilarData {
  id: number;
  poster_path: string;
  name: string;
  title: string;
  vote_average: number;
  release_date: string;
  first_air_date: string;
}

interface SimilarProps {
  id: number;
  contentType: string;
  name: string;
  title: string;
}

export function Similar({ id, contentType, name, title }: SimilarProps) {
  const [data, setData] = useState<SimilarData[] | null>([]);

  const {
    carouselRef,
    isLeftDisabled,
    isRightDisabled,
    scrollRight,
    scrollLeft
  } = useCarousel();

  useEffect(() => {
    fetchSimilarMovies();
  }, [id]);

  async function fetchSimilarMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/similar?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setData(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-white font-bold text-xl md:text-2xl leading-tight">
        Parecido com {name || title}
      </h2>
      <section
        ref={carouselRef}
        className="flex items-center gap-3 pt-8 overflow-x-scroll lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        <CarouselButton
          direction="left"
          onClick={scrollLeft}
          disabled={isLeftDisabled}
        />
        {data.map((item) => (
          <Card
            key={item.id}
            poster_path={item.poster_path}
            name={item.name}
            title={item.title}
            vote_average={item.vote_average}
            first_air_date={item.first_air_date}
            release_date={item.release_date}
            id={item.id}
            href={contentType === "movie" ? "/movie" : "/serie"}
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
