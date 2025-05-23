"use client";

import { apiKey } from "@/_utils/api-key";
import { PersonDetailsData } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Clapperboard } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

interface CastProps {
  contentType: string;
  contentId: number;
}

export function Cast({ contentType, contentId }: CastProps) {
  const [cast, setCast] = useState<PersonDetailsData[] | null>(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${contentType}/${contentId}/credits?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      }
    }

    fetchCast();
  }, [contentType, contentId]);

  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-white font-bold text-xl md:text-2xl leading-tight">
        Elenco
      </h2>

      <div className="pt-8">
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
          {cast.map((item, index) => (
            <SwiperSlide
              className="w-full relative"
              key={`${item.id} ${index}`}
            >
              <Link href={`/person/${item.id}`}>
                <div className="rounded-[3px] relative h-[500px] lg:h-[450px] cursor-pointer border border-[#333333] hover:border-white">
                  {item?.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt={item.name ?? ""}
                      title={item.name}
                      width={0}
                      height={0}
                      quality={100}
                      sizes="100vh"
                      className="w-full h-[380px] lg:h-[320px]"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center h-[380px] lg:h-[320px] justify-center">
                      <Clapperboard className="size-16 fill-white text-transparent" />
                    </div>
                  )}

                  <div className="w-full py-4 border-t border-[#333333]">
                    <div className="pl-4 lg:pl-8 lg:pr-9 flex flex-col gap-1 justify-center">
                      <h2 className="font-semibold text-lg text-white lg:truncate">
                        {item?.name}{" "}
                      </h2>
                      <p className="text-white/50 text-base">
                        {item?.character}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
