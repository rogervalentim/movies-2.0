"use client";

import { apiKey } from "@/_utils/api-key";
import { Backdrops, MovieDetailsData } from "@/types";
import { useEffect, useState } from "react";
import { Cast } from "./cast";
import { Similar } from "./similar";
import { Recommended } from "./recommended";
import Image from "next/image";
import ImageCarousel from "./image-carousel";
import { formatDate } from "@/_utils/format-date";
import { formatDuration } from "@/_utils/format-duration";
import { Collection } from "./collection";
import { Seasons } from "./seasons";
import "react-loading-skeleton/dist/skeleton.css";

interface DetailsProps {
  id: number;
  contentType: string;
}

export function Details({ id, contentType }: DetailsProps) {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(
    null
  );
  const [movieImages, setMovieImages] = useState<Backdrops[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    fetchMovieDetail();
    fetchImages();
  }, [id]);

  async function fetchMovieDetail() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${apiKey}&language=pt-BR`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchImages() {
    try {
      setLoadingImages(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${id}/images?api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMovieImages(data.backdrops);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingImages(false);
    }
  }

  return (
    <section>
      {/* MOBILE */}
      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
        {/* MOBILE */}
        <div className="lg:hidden py-6 container flex flex-col gap-4">
          {loading ? (
            <div className="w-full h-[500px] rounded-lg bg-[#1f1f1f] animate-pulse" />
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/w780${movieDetails?.poster_path}`}
              alt="image"
              width={0}
              height={0}
              key={movieDetails?.id}
              quality={100}
              sizes="100vh"
              className="w-full h-full object-cover border border-[#333333] rounded-[3px]"
              unoptimized
            />
          )}

          <div className="flex flex-col gap-3">
            <div className="text-slate-400 text-sm">
              {loading ? (
                <div className="w-24 h-4 bg-[#1f1f1f] rounded animate-pulse" />
              ) : (
                formatDate(
                  movieDetails?.release_date ??
                    movieDetails?.first_air_date ??
                    ""
                )
              )}
            </div>

            <h1 className="text-white font-bold text-2xl leading-tight">
              {loading ? (
                <div className="w-40 h-6 bg-[#1f1f1f] rounded animate-pulse" />
              ) : (
                movieDetails?.title || movieDetails?.name
              )}
            </h1>

            <div className="flex flex-wrap gap-2">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-20 h-6 bg-[#1f1f1f] rounded-full animate-pulse"
                      />
                    ))
                : movieDetails?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-slate-400 text-xs px-3 py-1 rounded-full border border-[#333333]"
                    >
                      {genre.name}
                    </span>
                  ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-[#1f1f1f] animate-pulse" />
              ) : (
                <span
                  className={`w-fit px-3 py-1 rounded-full text-sm font-semibold text-black shadow ${
                    (movieDetails?.vote_average ?? 0) >= 7
                      ? "bg-green-400 border-2 border-green-950"
                      : (movieDetails?.vote_average ?? 0) >= 5
                        ? "bg-yellow-400 border-2 border-yellow-950"
                        : "bg-red-400 border-2 border-red-950"
                  }`}
                >
                  {(movieDetails?.vote_average ?? 0).toFixed(1)}
                </span>
              )}

              {loading ? (
                <div className="w-20 h-5 bg-[#1f1f1f] rounded animate-pulse" />
              ) : (
                movieDetails?.runtime && (
                  <p className="text-slate-400 text-sm">
                    {formatDuration(movieDetails.runtime)}
                  </p>
                )
              )}
            </div>

            <div className="text-slate-400 text-sm leading-relaxed">
              {loading ? (
                <div className="space-y-2">
                  <div className="w-full h-4 bg-[#1f1f1f] rounded animate-pulse" />
                  <div className="w-4/5 h-4 bg-[#1f1f1f] rounded animate-pulse" />
                  <div className="w-3/5 h-4 bg-[#1f1f1f] rounded animate-pulse" />
                </div>
              ) : (
                movieDetails?.overview ||
                "Nenhuma descrição disponível para este filme."
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:flex py-10 container gap-8 items-center">
          <div className="w-[45%] flex flex-col gap-5">
            <div className="text-slate-400 text-sm">
              {loading ? (
                <div className="w-24 h-4 bg-[#1f1f1f] rounded animate-pulse" />
              ) : (
                formatDate(
                  movieDetails?.release_date ??
                    movieDetails?.first_air_date ??
                    ""
                )
              )}
            </div>

            <h1 className="text-white font-bold text-4xl leading-tight">
              {loading ? (
                <div className="w-60 h-8 bg-[#1f1f1f] rounded animate-pulse" />
              ) : (
                movieDetails?.title || movieDetails?.name
              )}
            </h1>

            <div className="flex flex-wrap gap-2">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-20 h-6 bg-[#1f1f1f] rounded-full animate-pulse"
                      />
                    ))
                : movieDetails?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-slate-400 text-xs px-3 py-1 rounded-full border border-[#333333]"
                    >
                      {genre.name}
                    </span>
                  ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-[#1f1f1f] animate-pulse" />
              ) : (
                <span
                  className={`w-fit px-3 py-1 rounded-full text-sm font-semibold text-black shadow ${
                    (movieDetails?.vote_average ?? 0) >= 7
                      ? "bg-green-400 border-2 border-green-950"
                      : (movieDetails?.vote_average ?? 0) >= 5
                        ? "bg-yellow-400 border-2 border-yellow-950"
                        : "bg-red-400 border-2 border-red-950"
                  }`}
                >
                  {(movieDetails?.vote_average ?? 0).toFixed(1)}
                </span>
              )}

              {loading ? (
                <div className="w-20 h-5 bg-[#1f1f1f] rounded animate-pulse" />
              ) : (
                movieDetails?.runtime && (
                  <p className="text-slate-400 text-sm">
                    {formatDuration(movieDetails.runtime)}
                  </p>
                )
              )}

              {loading ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#1f1f1f] animate-pulse" />
                  <div className="w-24 h-5 bg-[#1f1f1f] rounded animate-pulse" />
                </>
              ) : (
                movieDetails?.number_of_seasons && (
                  <>
                    <span className="w-fit px-3 py-1 rounded-full bg-white text-black font-bold text-sm shadow">
                      {movieDetails.number_of_seasons}
                    </span>
                    <p className="text-slate-400 text-sm">Temporadas</p>
                  </>
                )
              )}
            </div>

            <div className="text-slate-400 text-sm leading-relaxed">
              {loading ? (
                <div className="space-y-2">
                  <div className="w-full h-4 bg-[#1f1f1f] rounded animate-pulse" />
                  <div className="w-4/5 h-4 bg-[#1f1f1f] rounded animate-pulse" />
                  <div className="w-3/5 h-4 bg-[#1f1f1f] rounded animate-pulse" />
                </div>
              ) : (
                movieDetails?.overview ||
                "Nenhuma descrição disponível para este filme."
              )}
            </div>
          </div>

          <div className="w-[55%] relative">
            {loading ? (
              <div className="w-full h-[500px] bg-[#1f1f1f] rounded-lg animate-pulse" />
            ) : (
              <div
                className="w-full h-[500px] bg-cover bg-center rounded-lg border border-[#333333]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails?.backdrop_path})`
                }}
              />
            )}

            {!loading && (
              <div
                className="absolute bottom-4 left-4 w-40 h-56 bg-cover rounded-lg border border-[#333333]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path})`
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="py-8 container">
        <Cast contentType={contentType} contentId={id} />
      </div>

      {!loadingImages && movieImages.length > 0 && (
        <div>
          <ImageCarousel movieImages={movieImages} />
        </div>
      )}

      <div className="py-8 container">
        <Recommended
          contentType={contentType}
          id={id}
          name={movieDetails?.name ?? ""}
          title={movieDetails?.title ?? ""}
        />
      </div>

      <div className="py-8 container">
        <Similar
          contentType={contentType}
          id={id}
          name={movieDetails?.name ?? ""}
          title={movieDetails?.title ?? ""}
        />
      </div>

      {movieDetails?.belongs_to_collection && (
        <div className="py-8 container">
          <Collection
            key={movieDetails.belongs_to_collection.id}
            id={movieDetails.belongs_to_collection.id}
            backdrop_path={
              movieDetails.belongs_to_collection.backdrop_path || ""
            }
            poster_path={movieDetails.belongs_to_collection.poster_path || ""}
            name={movieDetails.belongs_to_collection.name}
          />
        </div>
      )}

      {movieDetails?.number_of_seasons && (
        <div className="py-8 container">
          <Seasons id={id} seasonNumber={1} />
        </div>
      )}
    </section>
  );
}
