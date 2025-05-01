import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import TopRated from "../_components/top-rated";

export default function SeriesTopRatedPage() {
  return (
    <>
      <Header />
      <TopRated contentType="tv" />
      <Footer />
    </>
  );
}
