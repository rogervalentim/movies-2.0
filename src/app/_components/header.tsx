"use client";

import { Clapperboard, MenuIcon, MoveRight, Search, X } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (showInput) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showInput]);

  function handleToggleMenu() {
    setToggleMenu(true);
  }

  function handleCloseToggleMenu() {
    setToggleMenu(false);
  }

  function handleSearchSubmit() {
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setShowInput(false);
  }

  function handleShowIpunt() {
    setShowInput(true);
  }

  function handleCloseInput() {
    setShowInput(false);
  }

  return (
    <>
      <header className="sticky top-0 z-[1000] w-full border-b-2 border-[#333333]  bg-background">
        <div className="flex justify-between py-4 items-center container sticky top-0 z-50">
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
                <span className="text-xl font-bold tracking-tight">
                  CineVerse
                </span>
              </Link>
            </div>

            <div className="lg:hidden">
              {showInput ? (
                <button className="border-none" onClick={handleCloseInput}>
                  <X className="text-white hover:text-white/50" />
                </button>
              ) : (
                <button className="border-none" onClick={handleShowIpunt}>
                  <Search className="text-white hover:text-white/50" />
                </button>
              )}
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
            <div className="hidden lg:flex items-center gap-9">
              {showInput ? (
                <button className="border-none" onClick={handleCloseInput}>
                  <X className="text-white hover:text-white/50" />
                </button>
              ) : (
                <button className="border-none" onClick={handleShowIpunt}>
                  <Search className="text-white hover:text-white/50" />
                </button>
              )}
              <Button
                viewDetails="Ver github"
                title="Ver github"
                isGithub={true}
              />
            </div>
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

      {showInput && (
        <>
          <div className="fixed h-screen inset-0 bg-black/50 " />
          <div className="flex justify-center items-center h-52 z-[1000] px-[1.95rem] bg-white fixed top-[72px] left-0 right-0">
            <div className="container">
              <input
                type="text"
                placeholder="faça a sua busca"
                className="w-full pl-2 placeholder:text-xl lg:placeholder:text-3xl text-3xl border-b-[0.5px] focus:outline-none border-slate-400 text-black h-20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
              />
              <button>
                <MoveRight
                  className="size-8 text-slate-400"
                  onClick={handleSearchSubmit}
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
