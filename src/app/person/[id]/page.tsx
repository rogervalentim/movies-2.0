import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { PersonDetails } from "./_components/person-details";

interface PersonPageProps {
  params: {
    id: number;
  };
}

export default async function PersonPage({ params: { id } }: PersonPageProps) {
  return (
    <>
      <Header />
      <PersonDetails id={id} />
      <Footer />
    </>
  );
}
