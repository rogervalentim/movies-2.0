import { Header } from "@/app/_components/header";
import { Details } from "@/app/_components/details";
import { Footer } from "@/app/_components/footer";

interface MoviePageProps {
  params: {
    id: number;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  return (
    <>
      <Header />
      <Details id={id} contentType="movie" />
      <Footer />
    </>
  );
}
