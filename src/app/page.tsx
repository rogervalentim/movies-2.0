import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Feature } from "./_components/feauture";
import { Footer } from "./_components/footer";
import { MoviesTrending } from "./_components/movies-trending";
import { SeriesTrending } from "./_components/series-trending";
import { HeroHome } from "./_components/hero-home";

export default function Home() {
  return (
    <>
      <Header />
      <HeroHome href="/movie" contentType="movie" />
      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>
      <div className="px-[1.95rem] mt-8">
        <MoviesTrending />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2  mx-[1.95rem] gap-5 mt-[2.875rem]">
        <Feature href="/movie" contentType="movie" />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="px-[1.95em] mt-8">
        <SeriesTrending />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2  mx-[1.95rem] gap-5 mt-[2.875rem]">
        <Feature href="/serie" contentType="tv" />
      </div>

      <div className=" mt-8">
        <Footer />
      </div>
    </>
  );
}
