import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#333333]">
      <div className="flex justify-between items-center  mx-[2.875rem] mb-[2.800rem] mt-[2.875rem]">
        <h2 className="text-white font-normal text-lg">
          Explore a collection of video games interfaces
          <br /> and find inspiration for your designs.
        </h2>
        <ul className="flex gap-[2.875rem]">
          <li>
            <Link href="/" className="text-white hover:text-white/50 uppercase">
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className="text-white hover:text-white/50 uppercase"
            >
              Filmes
            </Link>
          </li>
          <li>
            <Link
              href="/series"
              className="text-white hover:text-white/50 uppercase"
            >
              Séries
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
