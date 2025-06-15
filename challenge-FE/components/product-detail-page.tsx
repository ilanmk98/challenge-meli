"use client"

import { useState } from "react"
import type { Product, Seller, PaymentMethod, RelatedProduct } from "@/types/product"
import { SellerSkeleton, PaymentMethodsSkeleton } from "./loading-skeleton"
import RelatedProducts from "./related-products"
import ProductImageSection from "./product-image-section"
import productInfoSection from "./product-info"
import StockBuyCard from "./stock-buy-card"
import descriptionSection from "./description-section"
import sellerCard from "./seller-card"
import paymentMethodCard from "./payment-method-card"
import categoryBreadcrumb from "./category-breadcbrumb"
import ProductCharacteristics from "./product-characteristics"

interface ProductDetailPageProps {
  product: Product
  seller: Seller | null
  paymentMethods: PaymentMethod[]
  relatedProducts: RelatedProduct[]
  loadingStates?: {
    seller: boolean
    paymentMethods: boolean
    relatedProducts: boolean
  }
}



export default function ProductDetailPage({ product, seller, paymentMethods, relatedProducts, loadingStates }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Breadcrumb */}
      {categoryBreadcrumb(product)}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white">
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-2">
              {/* Product Images - 4 columns */}
              <ProductImageSection
                product={product}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />

              {/* Product Info - 5 columns */}
              {productInfoSection(product,seller)}
            </div>
            <div className="lg:col-span-9 mt-8 border-t border-gray-200 pt-4">
              <RelatedProducts products={relatedProducts} loading={loadingStates?.relatedProducts} />
            </div>
            <div className="lg:col-span-9 border-t border-gray-200 pt-4">
            <ProductCharacteristics characteristics={product.characteristics} />
          </div>
            {/* Product Description - Spans only the first 9 columns (4+5) */}
            <div className="lg:col-span-9 border-t border-gray-200 pt-4">{descriptionSection(product)}</div>
            
          </div>
          {/* Purchase Section - 3 columns */}
          <div className="lg:col-span-3">
            <div className="sticky top-4 space-y-4">
              {/* Price and Purchase */}
              {StockBuyCard(product, quantity, setQuantity)}

              {/* Seller Section with Loading */}
              {loadingStates?.seller ? (
                <SellerSkeleton />
              ) : seller ? (
                sellerCard(seller)
              ) : null}

              {/* Payment Methods with Loading */}
              {loadingStates?.paymentMethods ? (
                <PaymentMethodsSkeleton />
              ) : paymentMethods.length > 0 ? (
                paymentMethodCard(product, paymentMethods)
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}














