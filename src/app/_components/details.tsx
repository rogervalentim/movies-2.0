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
import { Seasons } from "./seasons";
import Skeleton from "react-loading-skeleton";
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
      <div className="lg:hidden bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
        <div className="container py-6 flex flex-col gap-4">
          {loading ? (
            <Skeleton height={400} />
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/w780${movieDetails?.poster_path}`}
              alt="image"
              width={0}
              height={0}
              quality={100}
              sizes="100vh"
              className="w-full h-full object-cover border border-[#333333] rounded-[3px]"
            />
          )}

          <p className="text-slate-400 text-sm leading-relaxed">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              formatDate(
                movieDetails?.release_date ?? movieDetails?.first_air_date ?? ""
              )
            )}
          </p>

          <h1 className="text-white font-bold text-xl md:text-3xl leading-tight">
            {loading ? (
              <Skeleton width={200} />
            ) : (
              movieDetails?.title || movieDetails?.name
            )}
          </h1>

          <div className="flex flex-wrap gap-1">
            {loading ? (
              <Skeleton count={3} width={80} height={24} />
            ) : (
              movieDetails?.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-slate-400 text-xs w-fit font-medium me-2 px-2.5 py-0.5 max-w-full rounded-full border-[0.3px] border-[#333333]"
                >
                  {genre.name}
                </span>
              ))
            )}
          </div>

          <div className="flex items-center gap-3">
            {loading ? (
              <Skeleton circle width={40} height={40} />
            ) : (
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold shadow-md">
                {movieDetails?.vote_average?.toFixed(1)}
              </span>
            )}
            <span className="flex">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                RenderStars(movieDetails?.vote_average)
              )}
            </span>
            {loading ? (
              <Skeleton width={50} />
            ) : (
              <div>
                {movieDetails?.runtime && (
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    {formatDuration(movieDetails?.runtime)}
                  </p>
                )}
              </div>
            )}
          </div>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {loading ? (
              <Skeleton count={3} />
            ) : (
              (movieDetails?.overview ??
              "Nenhuma descrição disponível para este filme.")
            )}
          </p>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)] h-[100%]">
        <div className="relative py-6 hidden lg:flex justify-between items-center container">
          <div className="w-[40%] h-full flex items-center justify-center">
            <div className="flex flex-col gap-4">
              <p className="text-slate-400 text-sm leading-relaxed">
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  formatDate(
                    movieDetails?.release_date ??
                      movieDetails?.first_air_date ??
                      ""
                  )
                )}
              </p>
              <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight">
                {loading ? (
                  <Skeleton width={250} />
                ) : (
                  movieDetails?.title || movieDetails?.name
                )}
              </h1>

              <div className="flex flex-wrap gap-1">
                {loading ? (
                  <Skeleton count={4} width={80} height={24} />
                ) : (
                  movieDetails?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-slate-400 text-xs w-fit font-medium me-2 px-2.5 py-0.5 max-w-full rounded-full border-[0.3px] border-[#333333]"
                    >
                      {genre.name}
                    </span>
                  ))
                )}
              </div>

              <div className="flex items-center gap-3">
                {loading ? (
                  <Skeleton circle width={40} height={40} />
                ) : (
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold shadow-md">
                    {movieDetails?.vote_average?.toFixed(1)}
                  </span>
                )}
                <span className="flex">
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    RenderStars(movieDetails?.vote_average)
                  )}
                </span>
                {loading ? (
                  <Skeleton width={50} />
                ) : (
                  <div>
                    {movieDetails?.runtime && (
                      <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                        {formatDuration(movieDetails?.runtime)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <p className="text-slate-400 text-base leading-relaxed">
                {loading ? (
                  <Skeleton count={3} />
                ) : (
                  (movieDetails?.overview ??
                  "Nenhuma descrição disponível para este filme.")
                )}
              </p>
            </div>
          </div>

          <div className="relative w-[60%] h-[500px]">
            {loading ? (
              <Skeleton height={500} />
            ) : (
              <div
                className="w-full h-[500px] bg-cover bg-center rounded-lg border border-[#333333]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetails?.backdrop_path})`
                }}
              ></div>
            )}
            {!loading && (
              <div
                className="absolute bottom-4 left-4 w-40 h-56 bg-cover rounded-lg border border-[#333333]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path})`
                }}
              ></div>
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
