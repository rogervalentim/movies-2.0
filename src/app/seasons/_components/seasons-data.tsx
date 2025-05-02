import { apiKey } from "@/_utils/api-key";
import Link from "next/link";
import Image from "next/image";

interface Params {
  params: {
    id: number;
  };
}

interface Season {
  season_number: number;
  name: string;
  poster_path: string;
  overview: string;
}

export default async function SeasonsData({ params }: Params) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${params}?api_key=${apiKey}&language=pt-BR`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar temporadas");
  }

  const data = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">
        Temporadas de {data.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.seasons.map((season: Season) => (
          <div
            key={season.season_number}
            className="border border-white/10 rounded p-4 bg-white/5"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
              alt={season.name}
              width={300}
              height={450}
              className="rounded mb-2"
            />
            <h2 className="text-xl font-semibold text-white">{season.name}</h2>
            <p className="text-sm text-white/70">
              {season.overview || "Sem descrição."}
            </p>
            <Link
              href={`/season/${params}/${season.season_number}`}
              className="inline-block mt-2 px-4 py-2 bg-white text-black rounded hover:bg-black hover:text-white hover:border-white border transition"
            >
              Ver Episódios
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
