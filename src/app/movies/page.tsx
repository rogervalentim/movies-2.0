import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hero } from "../_components/hero";
import { MoviesTrending } from "../_components/movies-trending";
import { MoviesNowPlaying } from "./_components/movies-now-playing";
import { MoviesPopular } from "./_components/movies-popular";
import { MoviesTopRated } from "./_components/movies-top-rated";

export default function MoviesPage() {
  return (
    <>
      <Header />

      <Hero href="movie" contentType="movie" />

      <div className="container pt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>
      <div className="container py-8">
        <MoviesTrending />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">
          {" "}
          Filmes melhores avaliados
        </p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="py-8  container">
        <MoviesTopRated />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em exibição</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="py-8  container">
        <MoviesNowPlaying />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes populares</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
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
