"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/_components/card";
import { apiKey } from "@/_utils/api-key";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SeriesPopularData {
  id: number;
  poster_path: string;
  href: string;
  name: string;
  vote_average: number;
  first_air_date: string;
}

export function SeriesPopular() {
  const [seriesPopular, setSeriesPopular] = useState<SeriesPopularData[]>([]);

  useEffect(() => {
    fetchSeriesPopular();
  }, []);

  async function fetchSeriesPopular() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setSeriesPopular(data.results);
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
          {seriesPopular.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                name={item.name}
                id={item.id}
                href="/serie"
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                first_air_date={item.first_air_date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
