
import { Badge } from "@/components/ui/badge"
import type { Product, Seller } from "@/types/product"
import { Star } from "lucide-react"
import OfficialStorePromo from "./officialStore/official-store"
import RankingBadge from "./ranking-badge"

export default function productInfoSection(product: Product, seller: Seller) {
  return <div className="lg:col-span-5">
    <div className="bg-white rounded-lg p-6">
      {seller && <OfficialStorePromo seller={seller} />}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-600">{product.condition}</span>|
        <span className="text-sm text-gray-600">+{product.soldCount} vendidos</span>
      </div>
      <RankingBadge ranking={product.ranking} />
      {/* Title */}
      <h1 className="text-2xl font-normal mb-4 text-gray-800">{product.title}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center">
          <span className="text-sm font-medium">{product.rating.average}</span>
          <div className="flex ml-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= Math.floor(product.rating.average) ? "fill-blue-400 text-blue-400" : "text-gray-300"}`} />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">({product.rating.count})</span>
      </div>


      <div className="mb-6 p-4 rounded-lg">

        {product.price.original && product.price.discount && (
          <div className="mb-1">
            <span className="text-sm text-gray-500 line-through">
              {product.price.currency} {product.price.original}
            </span>
          </div>
        )}


        <div className="mb-3">
          <span className="text-4xl font-light text-gray-900">
            {product.price.currency} {product.price.current}
            {product.price.discount && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-sm ml-2">
                {product.price.discount}% OFF
              </Badge>
            )}
          </span>
        </div>


        <div className="mb-2">
          <p className="text-sm text-gray-700">
            en <span className="font-medium">{product.price.installments.count}x</span> de{" "}
            <span className="font-medium">
              {product.price.currency} {product.price.installments.amount}
            </span>
            {product.price.installments.interestFree && (
              <span className="text-green-600 font-medium"> sin interés</span>
            )}
          </p>
        </div>


        <p className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">
          Ver medios de pago y promociones
        </p>
      </div>


      <div className="mb-6">
        <h3 className="font-medium mb-4">Lo que tienes que saber de este producto</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {product.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>


      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Opciones de compra:</h3>
        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
          3 opciones desde {product.price.currency} {product.price.current}
        </p>
      </div>
    </div>
  </div>
}