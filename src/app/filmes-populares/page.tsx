import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import Popular from "../_components/popular";

export default function MoviesPopularPage() {
  return (
    <>
      <Header />
      <Popular contentType="movie" />
      <Footer />
    </>
  );
}
