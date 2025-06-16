"use client"

import type { PaymentMethod, Product, RelatedProduct, Seller } from "@/types/product"
import { useState } from "react"
import categoryBreadcrumb from "./categoryBreadcrumb/category-breadcbrumb"
import descriptionSection from "./descriptionSection/description-section"
import { PaymentMethodsSkeleton, SellerSkeleton } from "./loading-skeleton"
import paymentMethodCard from "./paymentMethodCard/payment-method-card"
import ProductCharacteristics from "./product-characteristics"
import productInfoSection from "./product-info"
import ProductImageSection from "./productImageSection/product-image-section"
import RelatedProducts from "./related-products"
import sellerCard from "./seller-card"
import StockBuyCard from "./stock-buy-card"


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

      {categoryBreadcrumb(product)}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white">
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-9 gap-2">

              <ProductImageSection
                product={product}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />


              {productInfoSection(product, seller)}
            </div>
            <div className="lg:col-span-9 mt-8 border-t border-gray-200 pt-4">
              <RelatedProducts products={relatedProducts} loading={loadingStates?.relatedProducts} />
            </div>
            <div className="lg:col-span-9 border-t border-gray-200 pt-4">
              <ProductCharacteristics characteristics={product.characteristics} />
            </div>

            <div className="lg:col-span-9 border-t border-gray-200 pt-4">{descriptionSection(product)}</div>

          </div>

          <div className="lg:col-span-3">
            <div className="sticky top-4 space-y-4">

              {StockBuyCard(product, quantity, setQuantity)}


              {loadingStates?.seller ? (
                <SellerSkeleton />
              ) : seller ? (
                sellerCard(seller)
              ) : null}


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














