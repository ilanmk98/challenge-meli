import type { Seller } from "@/types/product"
import Image from "next/image"

interface OfficialStorePromoProps {
  seller: Seller
  loading?: boolean
}

export default function OfficialStorePromo({ seller, loading }: OfficialStorePromoProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <Image
        src={seller.logo || "/placeholder.svg?height=16&width=16&text=Logo"}
        alt={`Logo de ${seller.name}`}
        width={16}
        height={16}
        className="rounded-sm object-contain"
      />
      <a href="#" className="text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
        Visita la Tienda Oficial de {seller.name}

      </a>
    </div>
  )
}
