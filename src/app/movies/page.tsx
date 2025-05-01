import Link from "next/link";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { MoviesTrending } from "../_components/movies-trending";
import { MoviesNowPlaying } from "./movies-now-playing";
import { MoviesPopular } from "./movies-popular";
import { MoviesTopRated } from "./movies-top-rated";

export default function MoviesPage() {
  return (
    <>
      <Header />

      <Hero href="movie" contentType="movie" />

      <div className="container pt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em tendência</p>
        <Link
          href="/filmes-em-tendencia"
          title="Clique aqui e veja todos os filmes em tendência"
          className="text-white text-sm font-semibold uppercase hover:underline"
        >
          Ver todos
        </Link>
      </div>
      <div className="container py-8">
        <MoviesTrending />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">
          Filmes melhores avaliados
        </p>
        <Link
          href="/filmes-melhores-avaliados"
          title="Clique aqui e veja todos os filmes melhores avaliados"
          className="text-white text-sm font-semibold uppercase hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="py-8  container">
        <MoviesTopRated />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em exibição</p>
        <Link
          href="/filmes-em-exibicao"
          title="Clique aqui e veja todos os filmes em exibição"
          className="text-white text-sm font-semibold uppercase hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="py-8  container">
        <MoviesNowPlaying />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes populares</p>
        <Link
          href="/filmes-populares"
          title="Clique aqui e veja todos os filmes populares"
          className="text-white text-sm font-semibold uppercase hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="py-8  container">
        <MoviesPopular />
      </div>

      <div className=" mt-8">
        <Footer />
      </div>
    </>
  );
}
