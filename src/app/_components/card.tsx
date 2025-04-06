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
  vote_average: number;
}

export function Card({
  id,
  name,
  title,
  poster_path,
  release_date,
  first_air_date,
  href,
  vote_average
}: CardProps) {
  return (
    <>
      <div className="rounded-[3px] relative h-[450px] cursor-pointer border border-[#333333] hover:border-white">
        <div>
          {poster_path ? (
            <>
              <Link href={`${href}/${id}`} title={name || title}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={(title || name) ?? ""}
                  title={name || title}
                  width={0}
                  height={0}
                  quality={100}
                  sizes="100vh"
                  className="w-full h-[320px] brightness-75 hover:brightness-100 object-cover"
                />
              </Link>
            </>
          ) : (
            <div className="flex items-center h-[320px] justify-center">
              <Clapperboard className="size-16 fill-white text-transparent" />
            </div>
          )}
        </div>
        <div className="w-[220px]">
          <div className="pt-6 pb-9 pl-8 pr-12 flex flex-col justify-center">
            <Link href={`${href}/${id}`} title={name || title}>
              <h2 className="font-normal text-lg text-white truncate">
                {title || name}
              </h2>
            </Link>
            <p className="text-white/50 ">
              {formatDate(release_date || first_air_date || "")}
            </p>
            <div className="flex">
              <span className="text-white font-semibold">
                {vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
