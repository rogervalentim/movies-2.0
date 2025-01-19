"use client";

import { apiKey } from "@/_utils/api-key";
import { Backdrops, MovieDetailsData } from "@/types";
import { useEffect, useState } from "react";
import { Cast } from "./cast";
import { Similar } from "./similar";
import { Recommended } from "./recommended";
import Image from "next/image";
import { CarouselButton } from "./carousel-button";
import { useCarousel } from "@/_hooks/use-carousel";

interface DetailsProps {
  id: number;
  contentType: string;
}

export function Details({ id, contentType }: DetailsProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [movieImages, setMovieImages] = useState<Backdrops[]>([]);

  const {
    carouselRef,
    isLeftDisabled,
    isRightDisabled,
    scrollRight,
    scrollLeft
  } = useCarousel();

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  async function fetchMovieDetail() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${contentType}/${id}/images?api_key=${apiKey}`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setMovieImages(data.backdrops);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImages();
  }, [id]);

  return (
    <section>
      <div className="lg:hidden flex flex-col gap-4 px-[1.95em] my-6">
        <Image
          src={`https://image.tmdb.org/t/p/w780${movieDetails?.poster_path}`}
          alt="image"
          width={0}
          height={0}
          key={movieDetails?.id}
          quality={100}
          sizes="100vh"
          className="w-full h-full object-cover border border-[#333333] rounded-[3px]"
        />

        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {movieDetails?.overview ||
            "Nenhuma descrição disponível para este filme."}
        </p>
      </div>

      <div className="relative w-full h-[500px] hidden lg:flex">
        <div className="w-[40%] h-full pl-[1.95rem] bg-[#0a0a0a] flex items-center justify-center">
          <div className="flex flex-col gap-4 px-4">
            <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight">
              {movieDetails?.title ||
                movieDetails?.name ||
                "Título Indisponível"}
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              {movieDetails?.overview ||
                "Nenhuma descrição disponível para este filme."}
            </p>
          </div>
        </div>

        <div
          className="w-[60%] min-h-screen"
          style={{
            backgroundImage: `
        linear-gradient(to right, #0a0a0a, transparent),
        url(https://image.tmdb.org/t/p/w1280/${movieDetails?.backdrop_path})
      `,
            backgroundPosition: "right",
            backgroundSize: "cover"
          }}
        ></div>
      </div>

      <div className="pt-10 lg:pt-36 px-[1.95rem] ">
        <Cast contentType={contentType} contentId={id} />
      </div>

      <h2 className="text-white font-bold text-xl text-center md:text-2xl leading-tight my-10">
        Galeria de fotos
      </h2>

      <div className="px-[1.95rem]">
        <div
          ref={carouselRef}
          className="flex items-center justify-center  mt-4  overflow-x-scroll  gap-3 [&::-webkit-scrollbar]:hidden"
        >
          <CarouselButton
            direction="left"
            onClick={scrollLeft}
            disabled={isLeftDisabled}
          />
          {movieImages?.map((item) => (
            <Image
              src={`https://image.tmdb.org/t/p/w780${item.file_path}`}
              alt="image"
              width={0}
              height={0}
              key={item.file_path}
              quality={100}
              sizes="100vh"
              className="w-full h-[250px] object-cover border border-[#333333] rounded-[3px]"
            />
          ))}
          <CarouselButton
            direction="right"
            onClick={scrollRight}
            disabled={isRightDisabled}
          />
        </div>
      </div>

      <div className="my-8 px-[1.95rem]">
        <Recommended
          contentType={contentType}
          id={id}
          name={movieDetails?.name ?? ""}
          title={movieDetails?.title ?? ""}
        />
      </div>
      <div className="my-8 px-[1.95rem]">
        <Similar
          contentType={contentType}
          id={id}
          name={movieDetails?.name ?? ""}
          title={movieDetails?.title ?? ""}
        />
      </div>
    </section>
  );
}
