"use client";

import { apiKey } from "@/_utils/api-key";
import { ActorDetails } from "@/types";
import { useEffect, useState } from "react";
import { CarouselButton } from "./carousel-button";
import { useCarousel } from "@/_hooks/use-carousel";
import Image from "next/image";
import { Clapperboard } from "lucide-react";

interface CastProps {
  contentType: string;
  contentId: number;
}

export function Cast({ contentType, contentId }: CastProps) {
  const [cast, setCast] = useState<ActorDetails[] | null>([]);

  const {
    carouselRef,
    scrollLeft,
    isLeftDisabled,
    scrollRight,
    isRightDisabled
  } = useCarousel();

  useEffect(() => {
    fetchCast();
  }, []);

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

  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="text-white font-bold text-xl md:text-2xl leading-tight">
        Elenco
      </h2>
      <section
        ref={carouselRef}
        className="flex items-center cursor-pointer gap-3  overflow-x-scroll pt-8  lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        <CarouselButton
          direction="left"
          onClick={scrollLeft}
          disabled={isLeftDisabled}
        />
        {cast?.map((item) => (
          <div
            key={item.id}
            className=" w-[235px] rounded-[3px] relative h-[450px] border border-[#333333] hover:border-white"
          >
            {item?.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.name ?? ""}
                title={item.name}
                width={0}
                height={0}
                quality={100}
                sizes="100vh"
                className="w-full h-[320px] brightness-75 hover:brightness-100 object-cover"
              />
            ) : (
              <div className="flex items-center h-[320px] justify-center">
                <Clapperboard className="size-16 fill-white text-transparent" />
              </div>
            )}
            <div className="w-[220px]">
              <div className="pt-6 pb-9 pl-8 pr-12 flex flex-col justify-center">
                <h2 className="font-normal text-lg text-white truncate">
                  {item?.name}
                </h2>
                <p className="text-white/50 ">{item?.character}</p>
              </div>
            </div>
          </div>
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
