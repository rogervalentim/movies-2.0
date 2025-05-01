"use client";

import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t-2 border-[#333333] ">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8  py-6 lg:py-8  justify-between">
          <div>
            <Link
              href="/"
              className="flex justify-center items-center gap-2 text-white hover:opacity-80 transition-opacity"
              title="CineVerse"
            >
              <Clapperboard className="size-6 text-white" />
              <span className="text-xl font-bold tracking-tight">
                CineVerse
              </span>
            </Link>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Menu
            </h2>
            <ul className="text-gray-400 font-medium">
              <li className="mb-4">
                <Link
                  href="/"
                  className={`${pathname === "/" ? "text-white hover:underline" : ""}`}
                  title="Inicio"
                >
                  Inicio
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/movies"
                  className={`${pathname === "/movies" ? "text-white hover:underline" : ""}`}
                  title="Filmes"
                >
                  Filmes
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/series"
                  className={`${pathname === "/series" ? "text-white hover:underline" : ""}`}
                  title="Séries"
                >
                  Séries
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Filmes
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link
                  href="/filmes-em-tendencia"
                  className={`${pathname === "/filmes-em-tendencia" ? "text-white hover:underline" : ""}`}
                  title="Filmes em tendência"
                >
                  Filmes em tendência
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/filmes-melhores-avaliados"
                  className={`${pathname === "/filmes-em-tendencia" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Filmes melhores avaliados"
                >
                  Filmes melhores avaliados
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/filmes-em-exibicao"
                  className={`${pathname === "/filmes-em-exibicao" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Filmes em exibição"
                >
                  Filmes em exibição
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/filmes-populares"
                  className={`${pathname === "/filmes-populares" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Filmes populares"
                >
                  Filmes populares
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Séries
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link
                  href="/series-em-tendencia"
                  className={`${pathname === "/series-em-tendencia" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Séries em tendência"
                >
                  Séries em tendência
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/series-melhores-avaliadas"
                  className={`${pathname === "/series-melhores-avaliadas" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Séries melhores avaliadas"
                >
                  Séries melhores avaliadas
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/series-em-exibicao"
                  className={`${pathname === "/series-em-exibicao" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Séries em exibição"
                >
                  Séries em exibição
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/series-populares"
                  className={`${pathname === "/series-populares" ? "text-white hover:underline" : "hover:underline"}`}
                  title="Séries populares"
                >
                  Séries populares
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-white md:flex md:items-center md:justify-between">
          <span className="text-sm text-black hover:text-gray-400 sm:text-center">
            © 2025 CineVerse. All Rights Reserved.
          </span>

          <Link href="/" className="text-black hover:text-gray-400">
            <Clapperboard />
          </Link>
        </div>
      </div>
    </footer>
  );
}
