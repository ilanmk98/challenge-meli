import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"

interface RankingBadgeProps {
  ranking: Product["ranking"]
}

export default function RankingBadge({ ranking }: RankingBadgeProps) {
  if (!ranking) {
    return null
  }
  return (
    <div className="flex items-center gap-3 mb-4">
      <Badge className={`bg-orange-500 text-white font-medium rounded-none`}>
        MAS VENDIDO
      </Badge>
      <span className="hover:underline cursor-pointer text-blue-600 text-xs">
        #{ranking.position} en {ranking.subcategory}
      </span>
    </div>
  )
}