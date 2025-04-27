"use client";

import { apiKey } from "@/_utils/api-key";
import Image from "next/image";
import Link from "next/link";
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

export function Collection({ id, name, poster_path }: CollectionProps) {
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
    <div className="flex flex-col-reverse lg:flex-row border-[0.3px] border-[#333333]">
      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]  w-full lg:w-[50%] max-h-auto h-[500px]   items-start  border-r-[0.3px] border-[#333333]">
        <div className="w-[90%] flex flex-wrap gap-5 flex-col justify-center items-start container h-[500px]">
          <h1 className="text-white text-3xl lg:text-5xl font-semibold ">
            {name}
          </h1>
          <p className="text-white/50 text-sm lg:text-base break-words w-full overflow-hidden whitespace-normal">
            {collectionData?.overview}
          </p>

          <Link
            href={`/collection/${id}`}
            className="w-[200px] flex justify-center items-center border border-transparent h-[45px] rounded-[3px] bg-white text-black hover:bg-black hover:text-white hover:border-white font-semibold"
          >
            Ver coleção
          </Link>
        </div>
      </div>
      <div className=" w-full lg:w-[50%]  h-[500px]">
        <Image
          src={`https://image.tmdb.org/t/p/w780${poster_path}`}
          alt={name ?? ""}
          title={name}
          width={0}
          height={0}
          quality={100}
          sizes="100vh"
          className="w-full h-[500px]"
        />
      </div>
    </div>
  );
}
