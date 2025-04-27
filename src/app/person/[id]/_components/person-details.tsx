"use client";

import { apiKey } from "@/_utils/api-key";
import { formatDate } from "@/_utils/format-date";
import { PersonDetailsData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Credits } from "./credits";

interface PersonDetailsProps {
  id: number;
}

interface CombinedCreditsData {
  id: number;
  original_title: string;
  backdrop_path: string;
  vote_average: number;
  popularity: number;
  name: string;
  title: string;
  release_date: string;
}

export function PersonDetails({ id }: PersonDetailsProps) {
  const [personDetails, setPersonDetails] = useState<PersonDetailsData | null>(
    null
  );

  const [latestWork, setLatestWork] = useState<CombinedCreditsData | null>(
    null
  );

  useEffect(() => {
    async function fetchPersonDetail() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=pt-BR`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPersonDetails(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPersonDetail();
  }, [id]);

  useEffect(() => {
    async function fetchCombinedCredits() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=pt-BR`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        // Filtra para pegar apenas produções com data válida
        const filteredAndSorted = data.cast
          .filter((item: CombinedCreditsData) => {
            const date = item.release_date || item.release_date;
            return !!date;
          })
          .sort((a: CombinedCreditsData, b: CombinedCreditsData) => {
            const dateA = new Date(a.release_date || a.release_date).getTime();
            const dateB = new Date(b.release_date || b.release_date).getTime();
            return dateB - dateA;
          });

        // Seta o mais recente
        setLatestWork(filteredAndSorted[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCombinedCredits();
  }, [id]);

  return (
    <section>
      <div className="lg:hidden flex flex-col  gap-4 px-[1.95em] py-6 bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
        <Image
          src={`https://image.tmdb.org/t/p/w780${personDetails?.profile_path}`}
          alt="image"
          width={0}
          height={0}
          key={personDetails?.id}
          quality={100}
          sizes="100vh"
          className="w-full h-full object-cover border border-[#333333] rounded-[3px]"
        />
        <h1 className="text-white font-bold text-xl md:text-3xl leading-tight">
          {personDetails?.name || "Título Indisponível"}
        </h1>

        <div className="flex flex-wrap gap-3">
          <p className="text-slate-400 text-base  leading-relaxed">
            {personDetails?.place_of_birth}
          </p>
          <p className="text-slate-400 text-base  leading-relaxed">
            {formatDate(personDetails?.birthday ?? "")}
          </p>
          <p className="text-slate-400 text-base  leading-relaxed">
            {personDetails?.known_for_department}
          </p>
        </div>

        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {personDetails?.biography ||
            "Nenhuma descrição disponível para essa pessoa."}
        </p>
      </div>

      <div className="bg-[radial-gradient(circle,rgba(255,255,255,0.05),#000)]">
        <div className="relative h-[500px] py-6 hidden lg:flex justify-between items-center container">
          <div className="w-[40%] h-full flex items-center justify-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-white font-bold text-3xl md:text-4xl leading-tight">
                {personDetails?.name || "Título Indisponível"}
              </h1>

              <div className="flex flex-wrap gap-3">
                <p className="text-slate-400 text-base  leading-relaxed">
                  {personDetails?.place_of_birth}
                </p>
                <p className="text-slate-400 text-base  leading-relaxed">
                  {formatDate(personDetails?.birthday ?? "")}
                </p>
                <p className="text-slate-400 text-base  leading-relaxed">
                  {personDetails?.known_for_department}
                </p>
              </div>
              <p className="text-slate-400 text-base leading-relaxed">
                {personDetails?.biography ||
                  "Nenhuma descrição disponível para essa pessoa."}
              </p>
            </div>
          </div>

          <div className="relative w-[60%] h-[500px]">
            <div
              className="w-full h-[500px] bg-cover bg-center rounded-lg border border-[#333333]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${latestWork?.backdrop_path})`
              }}
              title={`${latestWork?.name || latestWork?.title}`}
            >
              {latestWork && (
                <Link
                  href={`/${latestWork.title ? "movie" : "serie"}/${latestWork.id}`}
                  className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md text-lg font-semibold max-w-[90%] hover:underline"
                >
                  {latestWork.title || latestWork.name}
                </Link>
              )}
            </div>
            <div
              className="absolute bottom-4 left-4 w-40 h-56 bg-cover rounded-lg border border-[#333333]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${personDetails?.profile_path})`
              }}
              title={`${personDetails?.name}`}
            ></div>
          </div>
        </div>
      </div>

      <div className="py-8 container">
        <Credits name={personDetails?.name ?? ""} contentId={id} />
      </div>
    </section>
  );
}
