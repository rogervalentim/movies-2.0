"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { apiKey } from "@/_utils/api-key";
import { Card } from "@/app/_components/card";

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
    <div className="p-4 text-white">
      <h1 className="text-2xl mb-4">
        Resultados para: <strong>{query}</strong>
      </h1>

      {isLoading && <p className="text-white/60">Carregando resultados...</p>}
      {isError && <p className="text-slate-400">Erro ao buscar resultados.</p>}
      {allResults.length === 0 && !isLoading && (
        <p>Nenhum resultado encontrado.</p>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        {allResults.map((item) => (
          <li key={`${item.media_type}-${item.id}`}>
            <Card
              profile_path={item.profile_path}
              poster_path={item?.poster_path ?? ""}
              name={item.name}
              title={item.title}
              first_air_date={item.first_air_date}
              release_date={item.release_date}
              id={item.id}
              href={
                item.media_type === "tv"
                  ? `/serie`
                  : item.media_type === "movie"
                    ? `/movie`
                    : item.media_type === "person"
                      ? `/person`
                      : "/"
              }
            />
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
