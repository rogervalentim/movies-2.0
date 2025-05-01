import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import NowPlaying from "../_components/now-playing";

export default function SeriesNowPlay() {
  return (
    <>
      <Header />
      <NowPlaying contentType="tv" />
      <Footer />
    </>
  );
}
