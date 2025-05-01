import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import TopRated from "../_components/top-rated";

export default function MoviesTopRatedPage() {
  return (
    <>
      <Header />
      <TopRated contentType="movie" />
      <Footer />
    </>
  );
}
