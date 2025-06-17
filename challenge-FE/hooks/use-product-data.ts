"use client"

import { apiService } from "@/services/api-service"
import type { PaymentMethod, Product, RelatedProduct, Seller } from "@/types/product"
import {
  mapBackendPaymentMethodsToFrontend,
  mapBackendProductToFrontend,
  mapBackendRelatedProductsToFrontend,
  mapBackendSellerToFrontend,
} from "@/utils/data-mappers"
import { useEffect, useState } from "react"

interface UseProductDataResult {
  product: Product | null
  seller: Seller | null
  paymentMethods: PaymentMethod[]
  relatedProducts: RelatedProduct[]
  loading: {
    product: boolean
    seller: boolean
    paymentMethods: boolean
    relatedProducts: boolean
  }
  error: {
    product: string | null
    seller: string | null
    paymentMethods: string | null
    relatedProducts: string | null
  }
  currentStep: "product" | "seller" | "payment" | "related" | "complete"
}

export function useProductData(productId: string): UseProductDataResult {
  const [product, setProduct] = useState<Product | null>(null)
  const [seller, setSeller] = useState<Seller | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])

  const [loading, setLoading] = useState({
    product: false,
    seller: false,
    paymentMethods: false,
    relatedProducts: false,
  })

  const [error, setError] = useState({
    product: null as string | null,
    seller: null as string | null,
    paymentMethods: null as string | null,
    relatedProducts: null as string | null,
  })

  const [currentStep, setCurrentStep] = useState<"product" | "seller" | "payment" | "related" | "complete">("product")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrentStep("product")
        setLoading((prev) => ({ ...prev, product: true }))
        setError((prev) => ({ ...prev, product: null }))

        const backendProduct = await apiService.getProductDetails(productId)
        const mappedProduct = mapBackendProductToFrontend(backendProduct, productId)
        setProduct(mappedProduct)
        setLoading((prev) => ({ ...prev, product: false }))

        setCurrentStep("seller")
        setLoading((prev) => ({ ...prev, seller: true }))
        setError((prev) => ({ ...prev, seller: null }))

        try {
          const backendSeller = await apiService.getSellerDetails(mappedProduct.sellerId)
          const mappedSeller = mapBackendSellerToFrontend(backendSeller, mappedProduct.sellerId)
          setSeller(mappedSeller)
        } catch (sellerError) {
          console.warn("Error fetching seller, continuing without seller data:", sellerError)
          setError((prev) => ({
            ...prev,
            seller:
              sellerError instanceof Error ? sellerError.message : "No se pudo cargar la información del vendedor",
          }))
        }
        setLoading((prev) => ({ ...prev, seller: false }))

        setCurrentStep("payment")
        setLoading((prev) => ({ ...prev, paymentMethods: true }))
        setError((prev) => ({ ...prev, paymentMethods: null }))

        try {
          const backendPaymentMethods = await apiService.getPaymentMethods()
          const mappedPaymentMethods = mapBackendPaymentMethodsToFrontend(backendPaymentMethods)
          setPaymentMethods(mappedPaymentMethods)
        } catch (paymentError) {
          console.warn("Error fetching payment methods, continuing without payment data:", paymentError)
          setError((prev) => ({
            ...prev,
            paymentMethods:
              paymentError instanceof Error ? paymentError.message : "No se pudieron cargar los métodos de pago",
          }))
        }
        setLoading((prev) => ({ ...prev, paymentMethods: false }))


        setCurrentStep("related")
        setLoading((prev) => ({ ...prev, relatedProducts: true }))
        setError((prev) => ({ ...prev, relatedProducts: null }))

        try {
          const backendRelatedProducts = await apiService.getRelatedProducts(productId)
          const mappedRelatedProducts = mapBackendRelatedProductsToFrontend(backendRelatedProducts)
          setRelatedProducts(mappedRelatedProducts)
        } catch (relatedError) {
          console.warn("Error fetching related products, continuing without related data:", relatedError)
          setError((prev) => ({
            ...prev,
            relatedProducts:
              relatedError instanceof Error ? relatedError.message : "No se pudieron cargar los productos relacionados",
          }))
        }
        setLoading((prev) => ({ ...prev, relatedProducts: false }))

        setCurrentStep("complete")
        console.log("Data loading completed successfully!")
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido"
        console.error("Error in fetchData:", err)

        if (currentStep === "product") {
          setError((prev) => ({ ...prev, product: errorMessage }))
          setLoading((prev) => ({ ...prev, product: false }))
        }
      }
    }

    if (productId) {
      fetchData()
    }
  }, [productId])

  return {
    product,
    seller,
    paymentMethods,
    relatedProducts,
    loading,
    error,
    currentStep,
  }
}
