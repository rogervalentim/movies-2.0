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
}

export function Card({
  id,
  name,
  title,
  poster_path,
  release_date,
  first_air_date,
  href
}: CardProps) {
  return (
    <>
      <Link
        href={`${href}/${id}`}
        className=" w-[435px] rounded-[3px] relative h-[450px] border border-[#333333] hover:border-white"
        title={name || title}
      >
        <div>
          {poster_path ? (
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
          ) : (
            <div className="flex items-center h-[320px] justify-center">
              <Clapperboard className="size-16 fill-white text-transparent" />
            </div>
          )}
        </div>
        <div className="w-[220px]">
          <div className="pt-6 pb-9 pl-8 pr-12 flex flex-col justify-center">
            <h2 className="font-normal text-lg text-white truncate">
              {title || name}
            </h2>
            <p className="text-white/50 ">
              {formatDate(release_date || first_air_date || "")}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
