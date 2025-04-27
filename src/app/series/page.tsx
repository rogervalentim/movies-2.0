import { Header } from "@/app/_components/header";
import { Hero } from "../_components/hero";
import { SeriesTrending } from "../_components/series-trending";
import { SeriesNowPlaying } from "./_components/series-now-playing";
import { SeriesTopRated } from "./_components/series-top-rated";
import { Footer } from "../_components/footer";
import { SeriesPopular } from "./_components/series-popular";

export default function SeriesPage() {
  return (
    <>
      <Header />

      <Hero href="/serie" contentType="tv" />

      <div className="container pt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>
      <div className="py-8  container">
        <SeriesTrending />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">
          Séries melhores avaliados
        </p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="py-8  container">
        <SeriesTopRated />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries em exibição</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="py-8  container">
        <SeriesNowPlaying />
      </div>

      <div className="container mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries populares</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="py-8  container">
        <SeriesPopular />
      </div>

      <div className=" mt-8">
        <Footer />
      </div>
    </>
  );
}
