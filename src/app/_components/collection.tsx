"use client";

import { apiKey } from "@/_utils/api-key";
import { useEffect, useState } from "react";

interface CollectionProps {
  id: number | undefined;
  name: string | undefined;
  backdrop_path: string | undefined;
  poster_path: string | undefined;
}

interface CollectionData {
  overview: string;
  parts: [
    {
      id: number;
      title: string;
      poster_path: string;
      backdrop_path: string;
      overview: string;
    }
  ];
}

export function Collection({
  id,
  name,
  backdrop_path,
  poster_path
}: CollectionProps) {
  const [collectionData, setCollectionData] = useState<CollectionData | null>(
    null
  );

  useEffect(() => {
    fetchCollection();
  }, []);

  async function fetchCollection() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setCollectionData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative">
      <div className="relative w-full h-screen">
        <div
          className="w-full h-screen bg-cover bg-center brightness-75 rounded-lg border border-[#333333]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${backdrop_path})`
          }}
        ></div>
        <div
          className="absolute bottom-4 left-4 w-40 h-56 bg-cover rounded-lg border border-[#333333]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`
          }}
        ></div>
      </div>
    </div>
  );
}
