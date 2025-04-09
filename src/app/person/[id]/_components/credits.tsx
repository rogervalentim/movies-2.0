"use client";

import { Card } from "@/app/_components/card";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiKey } from "@/_utils/api-key";

interface CreditsProps {
  contentId: number;
  name: string;
}

interface CreditsData {
  id: number;
  poster_path: string;
  name: string;
  title: string;
  vote_average: number;
  media_type: string;
  release_date: string;
  first_air_date: string;
}

export function Credits({ contentId, name }: CreditsProps) {
  const [creditsData, setCreditsData] = useState<CreditsData[]>([]);

  useEffect(() => {
    fetchCreditsData();
  }, []);

  async function fetchCreditsData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${contentId}/combined_credits?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      const uniqueCredits = data.cast.reduce(
        (acc: CreditsData[], current: CreditsData) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            acc.push(current);
          }
          return acc;
        },
        []
      );

      setCreditsData(uniqueCredits);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className="text-white font-bold text-xl md:text-2xl leading-tight">
        Participações de {name}
      </h2>
      <section className="pt-8">
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
          {creditsData.map((item) => (
            <SwiperSlide key={item.id} className="w-[435px] relative">
              <Card
                poster_path={item.poster_path}
                name={item.name}
                title={item.title}
                vote_average={item.vote_average}
                first_air_date={item.first_air_date}
                release_date={item.release_date}
                id={item.id}
                href={item.media_type === "movie" ? "/movie" : "/serie"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
