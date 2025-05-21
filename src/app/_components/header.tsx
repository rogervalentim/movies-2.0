"use client";

import { ChevronDown, Clapperboard, MenuIcon, X, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState<null | "movies" | "series">(
    null
  );

  const router = useRouter();
  const pathname = usePathname();

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setToggleMenu(false); // Fecha o menu no mobile após a busca
  }

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-zinc-800 bg-background">
      <div className="container flex items-center justify-between py-4 px-4 md:px-6 lg:py-6">
        {/* Logo + Mobile Menu Toggle */}
        <div className="flex items-center w-full justify-between gap-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Clapperboard className="size-6 text-white" />
            <span className="text-white text-lg font-bold sm:inline">
              CineVerse
            </span>
          </Link>
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {toggleMenu ? (
              <X className="size-7 text-white hover:text-white/70 transition" />
            ) : (
              <MenuIcon className="size-7 text-white hover:text-white/70 transition" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Clapperboard className="size-6 text-white" />
            <span className="text-white text-lg font-bold sm:inline">
              CineVerse
            </span>
          </Link>
          <Link
            href="/"
            className={`font-semibold uppercase text-sm transition-colors ${
              pathname === "/" ? "text-white" : "text-white/50 hover:text-white"
            }`}
          >
            Início
          </Link>

          {/* Dropdown: Filmes */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("movies")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`flex items-center gap-1 font-semibold uppercase text-sm transition-colors ${
                pathname.startsWith("/filmes")
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Filmes <ChevronDown size={14} />
            </button>
            <ul
              className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 transform transition-all duration-200 ease-in-out origin-top ${
                openDropdown === "movies"
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              {[
                { name: "Filmes", href: "/movies" },
                { name: "Em tendência", href: "/filmes-em-tendencia" },
                {
                  name: "Melhores avaliados",
                  href: "/filmes-melhores-avaliados"
                },
                { name: "Em exibição", href: "/filmes-em-exibicao" },
                { name: "Populares", href: "/filmes-populares" }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dropdown: Séries */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("series")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`flex items-center gap-1 font-semibold uppercase text-sm transition-colors ${
                pathname.startsWith("/series")
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Séries <ChevronDown size={14} />
            </button>
            <ul
              className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 transform transition-all duration-200 ease-in-out origin-top ${
                openDropdown === "series"
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              {[
                { name: "Séries", href: "/series" },
                { name: "Em tendência", href: "/series-em-tendencia" },
                {
                  name: "Melhores avaliadas",
                  href: "/series-melhores-avaliadas"
                },
                { name: "Em exibição", href: "/series-em-exibicao" },
                { name: "Populares", href: "/series-populares" }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex w-full max-w-md lg:max-w-sm relative ml-auto"
        >
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar filmes, séries e pessoas"
            className="w-full bg-transparent border border-slate-600 rounded-md py-2 pl-10 pr-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:brightness-95 transition"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="bg-white w-full">
          <div className="lg:hidden    py-6 container flex flex-col gap-4 animate-fade-in-down">
            {[
              { name: "Início", href: "/" },
              { name: "Filmes", href: "/filmes" },
              { name: "Séries", href: "/series" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setToggleMenu(false)}
                className={`text-lg font-medium uppercase transition-colors ${
                  pathname === item.href
                    ? "text-black"
                    : "text-black/50 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar filmes, séries e pessoas"
                className="flex-1 border border-slate-300 rounded-md py-2 px-3 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md text-sm"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
