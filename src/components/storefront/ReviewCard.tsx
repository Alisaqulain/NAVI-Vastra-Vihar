import { Star } from "lucide-react";
import { Review } from "@/lib/models";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-beige bg-cream-light p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-gold text-gold" : "text-beige"}`}
            />
          ))}
        </div>
        {review.verified && <Badge variant="emerald">Verified</Badge>}
      </div>
      <div>
        <h4 className="font-medium text-navy">{review.title}</h4>
        <p className="text-sm text-navy/60 mt-1">{review.comment}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-navy/50 pt-2 border-t border-beige">
        <span>{review.userName}</span>
        <span>{formatDate(review.createdAt)}</span>
      </div>
    </div>
  );
}
