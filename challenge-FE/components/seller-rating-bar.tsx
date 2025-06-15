import type { SellerRating } from "@/types/product"


export default function SellerRatingBar({ rating }: { rating: SellerRating }) {
  return (
    <div className="space-y-3 mb-4">
      <div>



        <div className="relative">
          <div className="flex h-3 rounded-full overflow-hidden">
            <div className="bg-red-500 flex-1"></div>
            <div className="bg-orange-400 flex-1"></div>
            <div className="bg-yellow-400 flex-1"></div>
            <div className="bg-green-500 flex-1"></div>
          </div>
          <div
            className="absolute top-0 w-1 h-3 bg-white border border-gray-400"
            style={{ left: `${(rating.overall / 5) * 100}%`, transform: "translateX(-50%)" }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Malo</span>
          <span>Regular</span>
          <span>Bueno</span>
          <span>Excelente</span>
        </div>
      </div>
    </div>
  )
}