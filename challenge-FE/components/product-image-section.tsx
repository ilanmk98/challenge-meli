
import Image from "next/image"
import type { Product } from "@/types/product"

type Props = {
  product: Product
  selectedImage: number
  setSelectedImage: (index: number) => void
}

export default function ProductImageSection({ product, selectedImage, setSelectedImage }: Props) {
  return <div className="lg:col-span-4">
    <div className="top-4 flex flex-col gap-4">
      <div className="bg-white rounded-lg p-4">
        <div className="flex gap-4">
          {/* Thumbnails - Vertical */}
          <div className="flex flex-col gap-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-20 border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  width={64}
                  height={80}
                  className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 aspect-[3/4] relative">
            <Image
              src={product.images[selectedImage]?.url || "/placeholder.svg"}
              alt={product.images[selectedImage]?.alt || product.title}
              fill
              className="object-contain rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
}