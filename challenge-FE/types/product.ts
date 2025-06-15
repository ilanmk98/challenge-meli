export interface ProductImage {
  id: string
  url: string
  alt: string
  type?: "IMAGEN" | "VIDEO"
}

export interface ProductRating {
  average: number
  count?: number
}

export interface Product {
  id: string
  title: string
  condition: string
  soldCount?: string
  images: ProductImage[]
  rating: ProductRating
  price: {
    current: number
    original?: number
    currency: string
    discount?: number
    installments: {
      count: number
      amount: number
      interestFree: boolean
    }
  }
  stock: {
    available: boolean
    quantity: number
    isLimited: boolean
  }
  features: string[]
  characteristics: string[]
  shortDescription: string
  fullDescription: {
    title: string
    content: string
  }[]
  sellerId: string
  shipping: {
    free: boolean
    nationwide: boolean
    estimatedDays?: number
  }
  warranty: {
    months: number
    type: string
  }
  category: {
    id: number
    name: string
    subcategory: {
      id: number
      name: string
    }
  }
  brand: string
  ranking: {
    position: number
    subcategory: string
  }
}

export interface SellerRating {
  overall: number
  fiveStars: number
  fourStars: number
  threeStars: number
  twoStars: number
  oneStars: number
}

export interface Seller {
  id: string
  name: string
  logo?: string
  banner?: string
  isOfficial: boolean
  isVerified: boolean
  rating: SellerRating
  totalSales: string
  totalProducts: number
  salesCount: number
  guarantees: string[]
  serviceQuality: {
    goodAttention: boolean
    onTimeDelivery: boolean
  }
}

export interface PaymentMethod {
  type: "credit" | "debit" | "cash"
  name: string
  logo: string
  category: string
}
export interface RelatedProduct {
  id: string
  title: string
  price: {
    current: number
    original?: number
    currency: string
    discount?: number
    installments: {
      count: number
      amount: number
      interestFree: boolean
    }
  }
  image: {
    url: string
    alt: string
  }
}

export interface ProductPageProps {
  product: Product
  seller?: Seller
  paymentMethods: PaymentMethod[]
}
