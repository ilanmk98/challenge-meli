"use client"

import { useProductData } from "@/hooks/use-product-data"
import ProductDetailPage from "@/components/product-detail-page"
import { ProductDetailSkeleton } from "@/components/loading-skeleton"
import { LoadingSpinner } from "@/components/loading-spinner"
import Header from "@/components/header"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const params = useParams()
const productId = params?.id as string // En una app real vendría de los parámetros de la URL
  const { product, seller, paymentMethods, relatedProducts, loading, error, currentStep } = useProductData(productId)

  // Mostrar estado de carga inicial
  if (loading.product || (!product && !error.product)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card className="mb-6">
            <CardContent className="p-6">
              <LoadingSpinner message="Cargando detalles del producto..." size="lg" />
              <div className="mt-4 text-center">
                <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
                  <div className="flex gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep === "product" ? "bg-blue-500 animate-pulse" : "bg-gray-300"}`}
                    />
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep === "seller" ? "bg-blue-500 animate-pulse" : "bg-gray-300"}`}
                    />
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep === "payment" ? "bg-blue-500 animate-pulse" : "bg-gray-300"}`}
                    />
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep === "related" ? "bg-blue-500 animate-pulse" : "bg-gray-300"}`}
                    />
                  </div>
                  <span>
                    Paso{" "}
                    {currentStep === "product"
                      ? "1"
                      : currentStep === "seller"
                        ? "2"
                        : currentStep === "payment"
                          ? "3"
                          : currentStep === "related"
                            ? "4"
                            : "4"}{" "}
                    de 4
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <ProductDetailSkeleton />
        </div>
      </div>
    )
  }

  // Mostrar estado de error del producto
  if (error.product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error al cargar el producto</h2>
              <p className="text-gray-600 mb-4">{error.product}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Probar mas tarde</p>
              
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reintentar
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Indicador de progreso para seller, payment methods y related products */}
      {(loading.seller || loading.paymentMethods || loading.relatedProducts) && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <LoadingSpinner size="sm" />
              <span>
                {loading.seller
                  ? "Cargando información del vendedor..."
                  : loading.paymentMethods
                    ? "Cargando métodos de pago..."
                    : "Cargando productos relacionados..."}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar errores no críticos */}
      {(error.seller || error.paymentMethods || error.relatedProducts) && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-yellow-700">
              <span>⚠️</span>
              <span>
                {error.seller && "No se pudo cargar información del vendedor. "}
                {error.paymentMethods && "No se pudieron cargar los métodos de pago. "}
                {error.relatedProducts && "No se pudieron cargar los productos relacionados. "}
                El producto se muestra con información limitada.
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProductDetailPage
          product={product}
          seller={seller}
          paymentMethods={paymentMethods}
          relatedProducts={relatedProducts}
          loadingStates={{
            seller: loading.seller,
            paymentMethods: loading.paymentMethods,
            relatedProducts: loading.relatedProducts,
          }}
        />
      </div>
    </div>
  )
}
