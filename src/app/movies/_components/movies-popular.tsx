"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MoviesPopularData {
  id: number;
  poster_path: string;
  href: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesPopular() {
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
      <section>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 15 }, // Telas pequenas
            768: { slidesPerView: 3, spaceBetween: 20 }, // Tablets
            1024: { slidesPerView: 4, spaceBetween: 25 }, // Laptops
            1280: { slidesPerView: 5.5, spaceBetween: 30 } // Telas grandes
          }}
        >
          {moviesPopular.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                id={item.id}
                href={"/movie"}
                release_date={item.release_date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
