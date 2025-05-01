"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MoviesNowPlayingData {
  id: number;
  href: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export function MoviesNowPlaying() {
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
          {moviesNowPlayingData.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                title={item.title}
                poster_path={item.poster_path}
                id={item.id}
                href={"/movie"}
                vote_average={item.vote_average}
                release_date={item.release_date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
