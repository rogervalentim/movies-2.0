import { Suspense } from "react";
import Search from "./_components/search";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Carregando...</div>}>
      <Header />
      <Search />
      <Footer />
    </Suspense>
  );
}
