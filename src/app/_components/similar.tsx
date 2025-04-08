"use client";

import { apiKey } from "@/_utils/api-key";
import { useEffect, useState } from "react";
import { Card } from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      <section className="pt-8 ">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          navigation
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 10 }, // Telas pequenas
            768: { slidesPerView: 3, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 4, spaceBetween: 25 }, // Laptops
            1280: { slidesPerView: 5.5, spaceBetween: 30 } // Telas grandes
          }}
        >
          {data.map((item) => (
            <SwiperSlide
              key={
                contentType === "movie" ? "movie" + item.id : "serie" + item.id
              }
              className="w-[435px] relative"
            >
              <Card
                poster_path={item.poster_path}
                name={item.name}
                title={item.title}
                vote_average={item.vote_average}
                first_air_date={item.first_air_date}
                release_date={item.release_date}
                id={item.id}
                href={contentType === "movie" ? "/movie" : "/serie"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
