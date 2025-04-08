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

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>
      <div className="pl-[1.95rem] md:px-[1.95em] mt-8">
        <MoviesTrending />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">
          {" "}
          Filmes melhores avaliados
        </p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="pl-[1.95rem] md:px-[1.95em] mt-8">
        <MoviesTopRated />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em exibição</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="pl-[1.95rem] md:px-[1.95em] mt-8">
        <MoviesNowPlaying />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes populares</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="pl-[1.95rem] md:px-[1.95em] mt-8">
        <MoviesPopular />
      </div>

      <div className=" mt-8">
        <Footer />
      </div>
    </>
  );
}
