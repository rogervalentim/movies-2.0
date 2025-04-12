"use client";

import { Clapperboard, MenuIcon, Search, X } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const pathname = usePathname();

  function handleToggleMenu() {
    setToggleMenu(true);
  }

  function handleCloseToggleMenu() {
    setToggleMenu(false);
  }

  return (
    <header className="sticky top-0 z-[1000] w-full border-b border-[#333333]  bg-background">
      <div className="flex justify-between py-4 items-center px-[1.95em] sticky top-0 z-50">
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
              <Clapperboard className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold tracking-tight">
                CineVerse
              </span>
            </Link>
          </div>

          <div className="lg:hidden">
            <button className="border-none">
              <Search className="text-white hover:text-white/50" />
            </button>
          </div>
          <ul className="hidden lg:flex items-center gap-9 ">
            <li className="hidden lg:block">
              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                title="CineVerse"
              >
                <Clapperboard className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold tracking-tight">
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
          <div className="hidden lg:flex items-center gap-9">
            <button className="border-none">
              <Search className="text-white/50" />
            </button>
            <Button
              viewDetails="Ver github"
              title="Ver github"
              isGithub={true}
            />
          </div>
        </div>
      </div>

      {toggleMenu && (
        <ul className="flex flex-col  h-screen items-center justify-center z-50 bg-white px-[1.95em] lg:hidden gap-3">
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
