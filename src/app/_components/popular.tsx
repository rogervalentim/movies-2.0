"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface PopularMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface PopularResponse {
  results: PopularMovie[];
  page: number;
  total_pages: number;
}

interface PopularProps {
  contentType: string;
}

interface PaginatedPopularResponse {
  results: PopularMovie[];
  nextPage: number | null;
}

async function fetchPopularContent({
  pageParam = 1,
  contentType
}: {
  pageParam?: number;
  contentType: string;
}): Promise<PaginatedPopularResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/${contentType}/popular?api_key=${apiKey}&language=pt-BR&page=${pageParam}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar conteúdo em tendência.");
  }

  const data: PopularResponse = await res.json();
  return {
    results: data.results,
    nextPage: data.page < data.total_pages ? data.page + 1 : null
  };
}

export default function Popular({ contentType }: PopularProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<PaginatedPopularResponse>({
    queryKey: ["Popular", contentType],
    queryFn: ({ pageParam = 1 }) =>
      fetchPopularContent({ pageParam, contentType }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
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

  const allItems = data?.pages.flatMap((page) => page.results) || [];

  const getTitle = () => {
    return contentType === "movie" ? "Filmes populares" : "Séries populares";
  };

  return (
    <div className="container pt-4 text-white">
      <h1 className="text-2xl mb-4">{getTitle()}</h1>

      {isLoading && (
        <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Skeleton height={300} />
              </li>
            ))}
        </ul>
      )}

      {isError && <p className="text-slate-400">Erro ao carregar conteúdo.</p>}

      <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        {allItems.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <Link
              href={`${contentType === "tv" ? "/serie" : "/movie"}/${item.id}`}
              title={item.title || item.name || ""}
            >
              <div className="w-full aspect-[2/3] relative border border-[#333333] rounded-[3px] bg-black">
                {item.poster_path ? (
                  <>
                    <Image
                      src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                      alt={item.title || item.name || ""}
                      fill
                      quality={100}
                      sizes="100vw"
                      className="object-cover rounded-[3px]"
                      unoptimized
                    />

                    <div
                      title="Média das avaliações dos usuários"
                      className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold shadow-md"
                    >
                      {item.vote_average?.toFixed(1)}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Clapperboard className="size-12 sm:size-20 fill-white text-transparent" />
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={loadMoreRef} className="py-6 text-center">
        {isFetchingNextPage && <p>Carregando mais...</p>}
        {!hasNextPage && !isLoading && <p>Você chegou ao fim da lista.</p>}
      </div>
    </div>
  );
}
