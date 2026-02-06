import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  total?: number
}

export function RatingStars({ rating, total = 5 }: RatingStarsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="flex items-center gap-1 shrink-0">
        {Array.from({ length: total }).map((_, i) => {
          const starValue = i + 1
          const isFull = rating >= starValue
          const isHalf = rating >= starValue - 0.5 && rating < starValue

          return (
            <span key={i} className="relative h-4 w-4">
              <Star className="absolute h-4 w-4 text-muted-foreground" />
              {(isHalf || isFull) && (
                <span className="absolute h-4 overflow-hidden" style={{ width: isHalf ? "50%" : "100%" }}>
                  <Star className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                </span>
              )}
            </span>
          )
        })}
      </div>
      <span className="text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">
        {rating}+ RATING
      </span>
    </div>
  )
}
