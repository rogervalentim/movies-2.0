import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  isRightDisabled?: boolean; // Nova prop para controlar se o botão direito está desabilitado
}

export function CarouselButton({
  direction,
  onClick,
  disabled = false,
  isRightDisabled = false
}: CarouselButtonProps) {
  const isDisabled = disabled || (direction === "right" && isRightDisabled);

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`hidden h-12 w-12 hover:h-14 hover:w-14 absolute bg-white rounded-full lg:flex justify-center ${isDisabled ? "lg:hidden" : ""} items-center ${direction === "right" ? "absolute right-0 z-50" : "absolute left-9 z-50"}`}
    >
      {direction === "left" ? (
        <ChevronLeftIcon className="size-6" />
      ) : (
        <ChevronRightIcon className="size-6" />
      )}
    </button>
  );
}
