import { formatDate } from "@/_utils/format-date";
import { Clapperboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: number;
  name?: string;
  title?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  href?: string;
  vote_average?: number;
  profile_path?: string;
}

export function Card({
  id,
  name,
  title,
  poster_path,
  release_date,
  first_air_date,
  href,
  vote_average,
  profile_path
}: CardProps) {
  return (
    <>
      <div className="rounded-[3px] relative h-[500px] lg:h-[450px] cursor-pointer border border-[#333333] hover:border-white">
        <div className="relative">
          {poster_path ? (
            <>
              <Link href={`${href}/${id}`} title={name || title}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${poster_path || profile_path}`}
                  alt={(title || name) ?? ""}
                  title={name || title}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="w-full h-[380px] lg:h-[320px]"
                />
              </Link>

              <div
                title="Média das avaliações dos usuários"
                className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-white text-black font-bold shadow-md"
              >
                {vote_average?.toFixed(1)}
              </div>
            </>
          ) : (
            <div className="flex items-center h-[380px] lg:h-[320px] justify-center">
              <Clapperboard className="size-16 fill-white text-transparent" />
            </div>
          )}
        </div>

        <div className="w-full py-4 border-t border-[#333333]">
          <div className="pl-4 lg:pl-8 lg:pr-9 flex flex-col gap-1 justify-center">
            <Link href={`${href}/${id}`} title={name || title}>
              <h2 className="font-semibold text-lg text-white lg:truncate">
                {title || name}
              </h2>
            </Link>
            <p className="text-white/50 text-base">
              {formatDate(release_date || first_air_date || "")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
