import { Footer } from "../../_components/footer";
import { Header } from "../../_components/header";
import SeasonsData from "../_components/seasons-data";

interface SeasonsProps {
  params: {
    id: number;
  };
}

export default function SeasonsPage({ params: { id } }: SeasonsProps) {
  return (
    <>
      <Header />
      <SeasonsData params={id} />
      <Footer />
    </>
  );
}
