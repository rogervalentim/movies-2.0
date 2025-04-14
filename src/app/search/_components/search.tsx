"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiKey } from "@/_utils/api-key";
import { MovieDetailsData } from "@/types";
import { Card } from "@/app/_components/card";

async function fetchSearchResults(searchData: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchData}&api_key=${apiKey}&include_adult=false&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar dados");
  }

  const data = await res.json();
  return data.results || [];
}

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, isLoading, isError } = useQuery<MovieDetailsData[]>({
    queryKey: ["search", query],
    queryFn: () => fetchSearchResults(query || ""),
    enabled: !!query // só faz fetch se tiver query
  });

  return (
    <>
      <div className="p-4 text-white">
        <h1 className="text-2xl mb-4">
          Resultados para: <strong>{query}</strong>
        </h1>

        {isLoading && <p className="text-white/60">Carregando resultados...</p>}
        {isError && (
          <p className="text-slate-400">Erro ao buscar resultados.</p>
        )}
        {data?.length === 0 && <p>Nenhum resultado encontrado.</p>}

        <ul className="grid grid-cols-1 md:grid-cols-4  gap-4 mt-4">
          {data?.map((item) => (
            <li key={item.id}>
              <Card
                profile_path={item.profile_path}
                poster_path={item.poster_path}
                name={item.name}
                title={item.title}
                vote_average={item.vote_average}
                first_air_date={item.first_air_date}
                release_date={item.release_date}
                id={item.id}
                href={item.media_type === "movie" ? "/movie" : "/serie"}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
