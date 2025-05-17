
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}

const StarRating = ({
  initialRating = 0,
  totalStars = 5,
  onChange,
  readOnly = false,
  className,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating: number) => {
    if (readOnly) return;
    
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className={cn("flex", className)}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        
        return (
          <button
            type="button"
            key={i}
            className={cn(
              "text-realreview-amber p-0 border-0 bg-transparent cursor-pointer w-5 h-5",
              readOnly && "cursor-default"
            )}
            onClick={() => handleRatingChange(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            disabled={readOnly}
          >
            <Star
              className={cn(
                "w-full h-full transition-all",
                (hover || rating) >= starValue ? "fill-realreview-amber" : "fill-none"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
