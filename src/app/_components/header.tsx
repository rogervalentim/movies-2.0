import { Clapperboard, Github, Search } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

export function Header() {
  return (
    <header className=" flex justify-between   border-b border-border-white/40  backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/60  py-4 items-center px-[1.95em] sticky top-0 z-50 ">
      <div className="flex items-center justify-between gap-12">
        <Clapperboard className="size-9 fill-white text-transparent" />

        <ul className="hidden lg:flex items-center gap-9">
          <li>
            <Link
              href="/"
              className="font-bold text-white/50  hover:text-white  uppercase text-xs"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className="font-bold text-white/50 hover:text-white  uppercase text-xs"
            >
              Filmes
            </Link>
          </li>
          <li>
            <Link
              href="/series"
              className="font-bold text-white/50  hover:text-white uppercase text-xs "
            >
              Séries
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden lg:flex items-center gap-9">
        <button className="border-none">
          <Search className="text-white/50" />
        </button>
        <Button viewDetails="Ver github" title="Ver github" icon={<Github />} />
      </div>
    </header>
  );
}
