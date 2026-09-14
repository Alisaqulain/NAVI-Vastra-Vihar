import { Star } from "lucide-react";
import { Review } from "@/lib/models";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="premium-card p-5 sm:p-6 space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < review.rating ? "fill-gold text-gold" : "text-beige"}`}
            />
          ))}
        </div>
        {review.verified && <Badge variant="emerald" className="text-[10px]">Verified</Badge>}
      </div>
      <div className="flex-1">
        <h4 className="font-serif text-base sm:text-lg text-navy">{review.title}</h4>
        <p className="text-sm text-navy/60 mt-2 leading-relaxed line-clamp-4">{review.comment}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-navy/50 pt-3 border-t border-beige/80">
        <span className="font-medium">{review.userName}</span>
        <span>{formatDate(review.createdAt)}</span>
      </div>
    </div>
  );
}
