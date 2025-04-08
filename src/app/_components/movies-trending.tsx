"use client";

import { apiKey } from "../../_utils/api-key";
import { useEffect, useState } from "react";
import { Card } from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MoviesTrendingData {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesTrending() {
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
      <section>
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
          {moviesTrendingData.map((item) => (
            <SwiperSlide key={item.id} className="w-[435px] relative">
              <Card
                poster_path={item.poster_path}
                title={item.title}
                vote_average={item.vote_average}
                release_date={item.release_date}
                id={item.id}
                href={"/movie"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
