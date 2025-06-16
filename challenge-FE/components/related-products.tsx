import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { RelatedProduct } from "@/types/product"
import Image from "next/image"

interface RelatedProductsProps {
  products: RelatedProduct[]
  loading?: boolean
}

export default function RelatedProducts({ products, loading }: RelatedProductsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-medium mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-medium mb-6">Productos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">

              <div className="aspect-square relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.image.url || "/placeholder.svg?height=200&width=200"}
                  alt={product.image.alt}
                  fill
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>


              <div className="space-y-2">

                <h3 className="text-sm font-normal text-gray-800 line-clamp-2 leading-tight">{product.title}</h3>


                <div className="space-y-1">

                  {product.price.original && product.price.discount && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 line-through">
                        {product.price.currency} {product.price.original}
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        {product.price.discount}% OFF
                      </Badge>
                    </div>
                  )}


                  <div className="text-lg font-light text-gray-900">
                    {product.price.currency} {product.price.current}
                  </div>


                  <div className="text-xs text-gray-600">
                    en {product.price.installments.count}x de {product.price.currency}{" "}
                    {product.price.installments.amount}
                    {product.price.installments.interestFree && <span className="text-green-600"> sin interés</span>}
                  </div>
                </div>


                <div className="pt-1">
                  <span className="text-xs text-green-600 font-medium">Envío gratis</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
