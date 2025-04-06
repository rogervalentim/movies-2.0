import { Star } from "lucide-react";

export const RenderStars = (rating: any) => {
  const stars = [];
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="text-white " />);
  }
  if (hasHalfStar) {
    stars.push(<Star key="half" className="text-white  opacity-50" />);
  }

  return stars;
};
