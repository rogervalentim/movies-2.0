import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import Trending from "../_components/trending";

export default function MoviesTrendingPage() {
  return (
    <>
      <Header />
      <Trending contentType="movie" />
      <Footer />
    </>
  );
}
