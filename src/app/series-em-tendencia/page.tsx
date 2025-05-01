import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import Trending from "../_components/trending";

export default function SeriesTrendingPage() {
  return (
    <>
      <Header />
      <Trending contentType="tv" />
      <Footer />
    </>
  );
}
