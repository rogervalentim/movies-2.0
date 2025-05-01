import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import NowPlaying from "../_components/now-playing";

export default function MoviesNowPlay() {
  return (
    <>
      <Header />
      <NowPlaying contentType="movie" />
      <Footer />
    </>
  );
}
