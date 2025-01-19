import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface ButtonProps {
  title: string;
  viewDetails: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export function Button({ title, viewDetails, icon }: ButtonProps) {
  return (
    <>
      <div
        title={viewDetails}
        className="rounded-[3px] bg-white border cursor-pointer  text-black hover:bg-black text-xs font-semibold transition-colors hover:border-white hover:text-white py-3 px-14"
      >
        <span className="flex items-center gap-3">
          <span className="font-bold">{title}</span>
          <span>{icon}</span>
        </span>
      </div>
    </>
  );
}
