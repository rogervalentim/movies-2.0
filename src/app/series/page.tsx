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

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries em tendência</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>
      <div className="pl-[1.95rem] px-[1.95rem] mt-8">
        <SeriesTrending />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">
          {" "}
          Séries melhores avaliados
        </p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="pl-[1.95rem] px-[1.95rem] mt-8">
        <SeriesTopRated />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries em exibição</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="pl-[1.95rem] px-[1.95rem] mt-8">
        <SeriesNowPlaying />
      </div>

      <div className="px-[1.95em] mt-16 flex items-center justify-between">
        <p className="text-lg text-white font-semibold">Séries populares</p>
        <a href="#" className="text-white text-sm font-semibold uppercase">
          Ver todos
        </a>
      </div>

      <div className="pl-[1.95rem] px-[1.95rem] mt-8">
        <SeriesPopular />
      </div>

      <div className=" mt-8">
        <Footer />
      </div>
    </>
  );
}
