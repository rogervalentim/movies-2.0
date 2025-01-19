import { Header } from "@/app/_components/header";
import { Details } from "@/app/_components/details";
import { Footer } from "@/app/_components/footer";

interface SeriePageProps {
  params: {
    id: number;
  };
}

export default async function SeriePage({ params }: SeriePageProps) {
  const { id } = await params;
  return (
    <>
      <Header />
      <Details id={id} contentType="tv" />
      <Footer />
    </>
  );
}
