import type { BackendProduct, BackendPaymentMethod, BackendSeller } from "@/types/backend"
import type { Product, PaymentMethod, Seller } from "@/types/product"

export function mapBackendProductToFrontend(backendProduct: BackendProduct, productId: string): Product {
  // Separar imágenes y videos
  const images = backendProduct.media
    .filter((media) => media.tipo === "IMAGEN")
    .map((media, index) => ({
      id: `${productId}-${index}`,
      url: media.url,
      alt: `${backendProduct.titulo} - Imagen ${index + 1}`,
      type: media.tipo,
    }))

  // Si no hay imágenes, agregar placeholder
  if (images.length === 0) {
    images.push({
      id: `${productId}-placeholder`,
      url: "/placeholder.svg?height=400&width=300",
      alt: backendProduct.titulo,
      type: "IMAGEN",
    })
  }

  // Calcular precio de cuota
  const installmentAmount = Math.round(backendProduct.precioActual / backendProduct.cuotasSinInteres)
const ranking =
    backendProduct.rankingSubcategoria && backendProduct.rankingSubcategoria <= 10
      ? {
          position: backendProduct.rankingSubcategoria,
          subcategory: backendProduct.subcategoria.nombre,
        }
      : undefined
  return {
    id: productId,
    title: backendProduct.titulo,
    condition: "Nuevo", // Asumo que todos son nuevos por ahora
    soldCount:backendProduct.cantidadVendidos.toString(),
    images,
    rating: {
      average: backendProduct.calificacion,
      count: backendProduct.cantidadCalificaciones, // No viene en el backend, se puede agregar después
    },
    price: {
      current: backendProduct.precioActual,
      original: backendProduct.precioOriginal,
      currency: "$",
      discount: backendProduct.porcentajeDescuento,
      installments: {
        count: backendProduct.cuotasSinInteres,
        amount: installmentAmount,
        interestFree: true,
      },
    },
    stock: {
      available: backendProduct.stockActual > 0,
      quantity: backendProduct.stockActual,
      isLimited: backendProduct.stockActual <= 5,
    },
    features: backendProduct.highlights.map((h) => h.texto),
    characteristics: backendProduct.caracteristicas.map((c) => c.texto),
    shortDescription: backendProduct.descripcion,
    fullDescription: [
      {
        title: "Descripción del producto",
        content: backendProduct.descripcion,
      },
    ],
    sellerId: backendProduct.vendedorId.toString(),
    shipping: {
      free: true, // Asumo envío gratis por defecto
      nationwide: true,
      estimatedDays: 3,
    },
    warranty: {
      months: 12, // Asumo 12 meses por defecto
      type: "de fábrica",
    },
    category: {
      id: backendProduct.subcategoria.categoria.id,
      name: backendProduct.subcategoria.categoria.nombre,
      subcategory: {
        id: backendProduct.subcategoria.id,
        name: backendProduct.subcategoria.nombre,
      },
    },
    brand: backendProduct.marca,
    ranking,
  }
}

export function mapBackendPaymentMethodsToFrontend(backendMethods: BackendPaymentMethod[]): PaymentMethod[] {
  return backendMethods.map((method) => {
    // Determinar el tipo basado en la categoría
    let type: "credit" | "debit" | "cash" = "credit"

    const categoryLower = method.categoriaNombre.toLowerCase()
    if (categoryLower.includes("debito") || categoryLower.includes("débito")) {
      type = "debit"
    } else if (categoryLower.includes("efectivo") || categoryLower.includes("cash")) {
      type = "cash"
    }

    return {
      type,
      name: method.nombre,
      logo: method.logo,
      category: method.categoriaNombre,
    }
  })
}

export function mapBackendSellerToFrontend(backendSeller: BackendSeller, sellerId: string): Seller {
  // Usar directamente la calificación que viene del backend
  const overallRating = backendSeller.calificacion

  // Generar distribución de estrellas simple basada en el rating del backend
  const generateStarDistribution = (rating: number) => {
    if (rating >= 4.5) {
      return { fiveStars: 85, fourStars: 12, threeStars: 2, twoStars: 1, oneStars: 0 }
    } else if (rating >= 4.0) {
      return { fiveStars: 70, fourStars: 20, threeStars: 7, twoStars: 2, oneStars: 1 }
    } else if (rating >= 3.5) {
      return { fiveStars: 50, fourStars: 30, threeStars: 15, twoStars: 4, oneStars: 1 }
    } else if (rating >= 3.0) {
      return { fiveStars: 30, fourStars: 25, threeStars: 25, twoStars: 15, oneStars: 5 }
    } else {
      return { fiveStars: 15, fourStars: 20, threeStars: 25, twoStars: 25, oneStars: 15 }
    }
  }

  const starDistribution = generateStarDistribution(overallRating)

  // Generar garantías basadas en las características del vendedor
  const guarantees: string[] = []

  if (backendSeller.brindaBuenaAtencion) {
    guarantees.push("Brinda buena atención")
  }

  if (backendSeller.entregaATiempo) {
    guarantees.push("Entrega sus productos a tiempo")
  }



  // Formatear cantidad de ventas
  const formatSalesCount = (count: number): string => {
    if (count >= 1000) {
      return `+${Math.floor(count / 1000)}mil`
    }
    return `+${count}`
  }

  return {
    id: sellerId,
    name: backendSeller.nombre,
    logo: backendSeller.foto,
    banner: backendSeller.banner,
    isOfficial: false, // No hay campo específico para tienda oficial
    isVerified: backendSeller.esVerificado,
    rating: {
      overall: overallRating, // Usar directamente el valor del backend
      ...starDistribution,
    },
    totalSales: formatSalesCount(backendSeller.cantidadDeVentas),
    totalProducts: backendSeller.cantidadProductos, // No viene en el backend, valor por defecto
    salesCount: backendSeller.cantidadDeVentas,
    guarantees,
    serviceQuality: {
      goodAttention: backendSeller.brindaBuenaAtencion,
      onTimeDelivery: backendSeller.entregaATiempo,
    },
  }
}
export function mapBackendRelatedProductsToFrontend(backendProducts: BackendRelatedProduct[]): RelatedProduct[] {
  return backendProducts.map((product, index) => {
    // Calcular descuento si hay precio original
    const discount = product.precioOriginal > product.precioActual 
      ? Math.round(((product.precioOriginal - product.precioActual) / product.precioOriginal) * 100)
      : undefined

    // Calcular precio de cuota
    const installmentAmount = Math.round(product.precioActual / product.cuotasSinInteres)

    return {
      id: `related-${index}`,
      title: product.titulo,
      price: {
        current: product.precioActual,
        original: product.precioOriginal > product.precioActual ? product.precioOriginal : undefined,
        currency: "$",
        discount,
        installments: {
          count: product.cuotasSinInteres,
          amount: installmentAmount,
          interestFree: true,
        },
      },
      image: {
        url: product.imagen.url,
        alt: product.titulo,
      },
    }
  })
}
