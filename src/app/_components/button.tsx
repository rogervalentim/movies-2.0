import { Github } from "lucide-react";

interface ButtonProps {
  title: string;
  viewDetails: string;
  isGithub?: boolean;
}

export function Button({ title, viewDetails, isGithub }: ButtonProps) {
  return (
    <div
      title={viewDetails}
      className="rounded-[3px] bg-white border cursor-pointer text-black hover:bg-black text-xs font-semibold transition-colors hover:border-white hover:text-white py-3 px-14"
    >
      <span className="flex items-center gap-3">
        <span className="font-bold">{title}</span>
        {isGithub && <Github className="w-4 h-4" />}
      </span>
    </div>
  );
}
