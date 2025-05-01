"use client";

import { Clapperboard, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function handleToggleMenu() {
    setToggleMenu(true);
  }

  function handleCloseToggleMenu() {
    setToggleMenu(false);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  }

  return (
    <>
      <header className="sticky top-0 z-[1000] w-full border-b-2 border-[#333333]  bg-background">
        <div className="flex justify-between py-6 items-center container sticky top-0 z-50">
          <div className="flex w-full items-center justify-between gap-12">
            <div className="lg:hidden">
              {toggleMenu ? (
                <button onClick={handleCloseToggleMenu}>
                  <X className="size-8 text-white hover:text-white/50" />
                </button>
              ) : (
                <button onClick={handleToggleMenu}>
                  <MenuIcon className="size-8 text-white hover:text-white/50" />
                </button>
              )}
            </div>

            <div className="lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                title="CineVerse"
              >
                <Clapperboard className="size-6 text-white" />
              </Link>
            </div>

            <ul className="hidden lg:flex items-center gap-9 ">
              <li className="hidden lg:block">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                  title="CineVerse"
                >
                  <Clapperboard className="size-6 text-white" />
                  <span className="text-xl font-bold tracking-tight">
                    CineVerse
                  </span>
                </Link>
              </li>
              {[
                { name: "Início", href: "/" },
                { name: "Filmes", href: "/movies" },
                { name: "Séries", href: "/series" }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-bold uppercase text-xs transition-colors ${
                      pathname === item.href
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Input de busca visível sempre */}
            <form
              className="w-full max-w-sm min-w-[200px]"
              onSubmit={handleSearchSubmit}
            >
              <div className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute w-5 h-5 top-2.5 left-2.5 text-white"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <input
                  type="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent placeholder:text-slate-400 text-white/50 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Buscar filmes, séries e pessoas"
                  required
                />

                <button
                  className="rounded-md bg-white py-2 px-4 border border-transparent text-center text-sm text-black transition-all shadow-md hover:shadow-lg focus:bg-white focus:shadow-none active:bg-white hover:bg-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>

        {toggleMenu && (
          <ul className="flex flex-col  h-screen items-center justify-center z-50 bg-white lg:hidden gap-3">
            {[
              { name: "Início", href: "/" },
              { name: "Filmes", href: "/movies" },
              { name: "Séries", href: "/series" }
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-bold uppercase text-lg transition-colors ${
                    pathname === item.href
                      ? "text-black"
                      : "text-black/50 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>
    </>
  );
}
