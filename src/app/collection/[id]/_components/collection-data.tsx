"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

interface CollectionData {
  title: string;
  overview: string;
  parts: {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
  }[];
}

export function CollectionData() {
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );

  useEffect(() => {
    async function fetchCollection() {
      const response = await fetch(
        `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setCollectionData(data);
    }

    fetchCollection();
  }, [id]);

  if (!collectionData)
    return <p className="text-white text-center mt-10">Carregando...</p>;

  return (
    <div className="text-white container py-8">
      <h2 className="text-3xl font-bold mb-4">Coleção</h2>
      <p className="mb-8 text-gray-300 text-lg leading-relaxed">
        {collectionData.overview}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {collectionData.parts.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            {movie?.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
                alt="image"
                width={0}
                height={0}
                title={movie?.title}
                key={movie?.id}
                quality={100}
                sizes="100vh"
                className="w-full h-full object-cover border border-[#333333] rounded-[3px]"
              />
            ) : (
              <div className="flex items-center w-full h-full border border-[#333333] rounded-[3px] justify-center">
                <Clapperboard className="size-16 fill-white text-transparent" />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
