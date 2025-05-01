import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import Popular from "../_components/popular";

export default function SeriesPopularPage() {
  return (
    <>
      <Header />
      <Popular contentType="tv" />
      <Footer />
    </>
  );
}
