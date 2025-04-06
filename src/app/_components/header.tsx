"use client";

import { Clapperboard, MenuIcon, Search, X } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const pathname = usePathname(); // Obtém a rota atual

  function handleToggleMenu() {
    setToggleMenu(true);
  }

  function handleCloseToggleMenu() {
    setToggleMenu(false);
  }

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-white  bg-background">
      <div className="flex justify-between py-4 items-center px-[1.95em] sticky top-0 z-50">
        <div className="flex items-center justify-between gap-12">
          <Clapperboard className="size-9 fill-white text-transparent" />

          <ul className="hidden lg:flex items-center gap-9 ">
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
        </div>

        <div className="backdrop-blur  supports-[backdrop-filter]:bg-background/60" />

        <div className="hidden lg:flex items-center gap-9">
          <button className="border-none">
            <Search className="text-white/50" />
          </button>
          <Button viewDetails="Ver github" title="Ver github" isGithub={true} />
        </div>

        <div className="lg:hidden">
          {toggleMenu ? (
            <button onClick={handleCloseToggleMenu}>
              <X className="size-8 text-white/50 hover:text-white" />
            </button>
          ) : (
            <button onClick={handleToggleMenu}>
              <MenuIcon className="size-8 text-white/50 hover:text-white" />
            </button>
          )}
        </div>
      </div>

      {toggleMenu && (
        <ul className="flex flex-col w-full h-screen items-center justify-center z-50 bg-white px-[1.95em] lg:hidden gap-3">
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
          <li>
            <button className="border-none">
              <Search className="text-black/50 hover:text-black" />
            </button>
          </li>
          <li>
            <Button
              viewDetails="Ver github"
              title="Ver github"
              isGithub={true}
            />
          </li>
        </ul>
      )}
    </header>
  );
}
