import { Header } from "./_components/header";
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
      <div className="  container pt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Filmes em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>
      <div className="py-8  container">
        <MoviesTrending />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2  py-8  container gap-5 mt-[2.875rem]">
        <Feature href="/movie" contentType="movie" />
      </div>

      <div className="py-8  container flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="py-8  container mt-8">
        <SeriesTrending />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 container gap-5 mt-[2.875rem]">
        <Feature href="/serie" contentType="tv" />
      </div>

      <div className=" mt-8">
        <Footer />
      </div>
    </>
  );
}
