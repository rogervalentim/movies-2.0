"use client";

import { apiKey } from "@/_utils/api-key";
import { Backdrops, MovieDetailsData } from "@/types";
import { useEffect, useState } from "react";
import { Cast } from "./cast";
import { Similar } from "./similar";
import { Recommended } from "./recommended";
import Image from "next/image";
import ImageCarousel from "./image-carousel";
import { RenderStars } from "@/utils/render-stars";
import { formatDate } from "@/_utils/format-date";
import { formatDuration } from "@/_utils/format-duration";
import { Collection } from "./collection";

interface DetailsProps {
  id: number;
  contentType: string;
}

export function Details({ id, contentType }: DetailsProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [movieImages, setMovieImages] = useState<Backdrops[]>([]);

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
      console.log(data);
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
      <div className="lg:hidden flex flex-col  gap-4 px-[1.95em] py-6 bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
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

        {contentType === "movie" && (
          <p className="text-slate-400 text-sm  leading-relaxed">
            {formatDate(movieDetails?.release_date ?? "")}
          </p>
        )}
        {contentType === "tv" && (
          <p className="text-slate-400 text-sm  leading-relaxed">
            {formatDate(movieDetails?.first_air_date ?? "")}
          </p>
        )}

        <h1 className="text-white font-bold text-xl md:text-3xl leading-tight">
          {movieDetails?.title || movieDetails?.name || "Título Indisponível"}
        </h1>

        <div className="flex flex-wrap gap-1">
          {movieDetails?.genres.map((genre) => (
            <span
              key={genre.id}
              className=" text-slate-400  text-xs w-fit font-medium me-2 px-2.5 py-0.5 max-w-full rounded-full border-[0.3px] border-[#333333]"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white">
            {movieDetails?.vote_average?.toFixed(1)}
          </span>
          <span className="flex">
            {RenderStars(movieDetails?.vote_average)}
          </span>
          {movieDetails?.number_of_seasons && (
            <div>
              <p className="text-white">
                Temporadas: {movieDetails?.number_of_seasons}
              </p>
            </div>
          )}

          {movieDetails?.runtime && (
            <div>
              <p className="text-white">
                {formatDuration(movieDetails?.runtime)}
              </p>
            </div>
          )}
          <div>
            {movieDetails?.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movieDetails?.imdb_id}/`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Veja  ${movieDetails?.name || movieDetails?.title} no IMDB`}
              >
                <Image
                  src="/imdb-logo-2016-1.svg"
                  width={50}
                  height={50}
                  alt="Logo do imdb"
                />
              </a>
            )}
          </div>
        </div>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {movieDetails?.overview ||
            "Nenhuma descrição disponível para este filme."}
        </p>
      </div>

      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)] h-[100%]">
        <div className="relative  py-6 hidden lg:flex justify-between items-center px-[1.95em]">
          <div className="w-[40%] h-full flex items-center justify-center">
            <div className="flex flex-col gap-4 px-4">
              {contentType === "movie" && (
                <p className="text-slate-400 text-sm  leading-relaxed">
                  {formatDate(movieDetails?.release_date ?? "")}
                </p>
              )}

              {contentType === "tv" && (
                <p className="text-slate-400 text-sm  leading-relaxed">
                  {formatDate(movieDetails?.first_air_date ?? "")}
                </p>
              )}
              <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight">
                {movieDetails?.title ||
                  movieDetails?.name ||
                  "Título Indisponível"}
              </h1>

              <div className="flex flex-wrap gap-1">
                {movieDetails?.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className=" text-slate-400  text-xs w-fit font-medium me-2 px-2.5 py-0.5 max-w-full rounded-full border-[0.3px] border-[#333333]"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white">
                  {movieDetails?.vote_average?.toFixed(1)}
                </span>
                <span className="flex">
                  {RenderStars(movieDetails?.vote_average)}
                </span>

                {movieDetails?.runtime && (
                  <div>
                    <p className="text-white">
                      {formatDuration(movieDetails?.runtime)}
                    </p>
                  </div>
                )}
                <div>
                  {movieDetails?.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movieDetails?.imdb_id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Veja  ${movieDetails?.name || movieDetails?.title} no IMDB`}
                    >
                      <Image
                        src="/imdb-logo-2016-1.svg"
                        width={50}
                        height={50}
                        alt="Logo do imdb"
                      />
                    </a>
                  )}
                </div>

                {movieDetails?.number_of_seasons && (
                  <div>
                    <p className="text-white">
                      Temporadas: {movieDetails?.number_of_seasons}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-slate-400 text-base  leading-relaxed">
                {movieDetails?.overview ||
                  "Nenhuma descrição disponível para este filme."}
              </p>
            </div>
          </div>

          <div className="relative w-[60%] h-screen">
            <div
              className="w-full h-screen bg-cover bg-center rounded-lg border border-[#333333]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails?.backdrop_path})`
              }}
            ></div>
            <div
              className="absolute bottom-4 left-4 w-40 h-56 bg-cover rounded-lg border border-[#333333]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path})`
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="my-8 pl-[1.95rem] px-[1.95rem]">
        <Cast
          contentType={contentType === "movie" ? "movie" : "tv"}
          contentId={id}
        />
      </div>

      {movieImages.length === 0 ? (
        ""
      ) : (
        <div className="my-8">
          <ImageCarousel movieImages={movieImages} />
        </div>
      )}

      <div className="my-8 pl-[1.95rem] px-[1.95rem]">
        <Recommended
          contentType={contentType}
          id={id}
          name={movieDetails?.name ?? ""}
          title={movieDetails?.title ?? ""}
        />
      </div>
      <div className="my-8 pl-[1.95rem] px-[1.95rem]">
        <Similar
          contentType={contentType}
          id={id}
          name={movieDetails?.name ?? ""}
          title={movieDetails?.title ?? ""}
        />
      </div>

      {movieDetails?.belongs_to_collection && (
        <div className="pl-[1.95rem] px-[1.95rem] my-8">
          <Collection
            key={movieDetails?.belongs_to_collection?.id}
            id={movieDetails?.belongs_to_collection?.id}
            backdrop_path={
              movieDetails?.belongs_to_collection?.backdrop_path || ""
            }
            poster_path={movieDetails?.belongs_to_collection?.poster_path || ""}
            name={movieDetails?.belongs_to_collection?.name}
          />
        </div>
      )}
    </section>
  );
}
