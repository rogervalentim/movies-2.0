"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
import { Clapperboard, UserRound } from "lucide-react";

type MediaType = "movie" | "tv" | "person";

interface SearchResult {
  id: number;
  media_type: MediaType;
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

interface SearchResponse {
  results: SearchResult[];
  page: number;
  total_pages: number;
}

interface PaginatedSearchResponse {
  results: SearchResult[];
  nextPage: number | null;
}

async function fetchSearchResults({
  pageParam = 1,
  query = ""
}: {
  pageParam?: number;
  query: string;
}): Promise<PaginatedSearchResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}&include_adult=false&language=pt-BR&page=${pageParam}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar dados");
  }

  const data: SearchResponse = await res.json();
  return {
    results: data.results || [],
    nextPage: data.page < data.total_pages ? data.page + 1 : null
  };
}

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Importação de estilo

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<PaginatedSearchResponse>({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) => fetchSearchResults({ pageParam, query }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!query
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const allResults = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="container pt-4 text-white">
      <h1 className="text-2xl mb-4">
        Resultados para: <strong>{query}</strong>
      </h1>

      {isLoading && (
        <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          {Array(5) // Aqui você pode alterar o número de skeletons a serem exibidos
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Skeleton height={300} />
              </li>
            ))}
        </ul>
      )}
      {isError && <p className="text-slate-400">Erro ao buscar resultados.</p>}
      {allResults.length === 0 && !isLoading && (
        <p>Nenhum resultado encontrado.</p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        {allResults.map((item) => (
          <li key={`${item.media_type}-${item.id}`}>
            <Link
              href={
                item.media_type === "tv"
                  ? `/serie/${item.id}`
                  : item.media_type === "movie"
                    ? `/movie/${item.id}`
                    : item.media_type === "person"
                      ? `/person/${item.id}`
                      : "/"
              }
              title={item.name || item.title}
            >
              <div className="w-full aspect-[2/3] relative border border-[#333333] rounded-[3px] bg-black">
                {item?.poster_path || item?.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${item.poster_path || item.profile_path}`}
                    alt="image"
                    fill
                    quality={100}
                    sizes="100vw"
                    className="object-cover rounded-[3px]"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full relative rounded-[3px]">
                    <div className="absolute top-2 right-2 bg-white text-black px-2.5 py-1.5 rounded-md text-sm font-semibold max-w-[90%] text-ellipsis overflow-hidden whitespace-nowrap">
                      {item?.name || item?.title}
                    </div>
                    {item?.poster_path ? (
                      <Clapperboard className="size-12 sm:size-20 fill-white text-transparent" />
                    ) : (
                      <UserRound className="size-12 sm:size-20 fill-white text-transparent" />
                    )}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="py-6 text-center">
        {isFetchingNextPage && <p>Carregando mais...</p>}
        {!hasNextPage && !isLoading && (
          <p>Você chegou ao fim dos resultados.</p>
        )}
      </div>
    </div>
  );
}
