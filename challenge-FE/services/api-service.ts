import type { BackendProduct, BackendPaymentMethod, BackendSeller } from "@/types/backend"

export interface ApiResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export class ApiService {
  private baseUrl: string

  constructor(baseUrl = "http://localhost:8080") {
    this.baseUrl = baseUrl
  }

  private async makeRequest<T>(url: string): Promise<T> {
    console.log(`Making request to: ${this.baseUrl}${url}`)

    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`Response from ${url}:`, data)
    return data
  }

  async getProductDetails(productId: string): Promise<BackendProduct> {
    console.log(`Fetching product details for ID: ${productId}`)
    return this.makeRequest<BackendProduct>(`/producto/${productId}`)
  }

  async getSellerDetails(sellerId: string): Promise<BackendSeller> {
    console.log(`Fetching seller details for ID: ${sellerId}`)
    return this.makeRequest<BackendSeller>(`/vendedor/${sellerId}`)
  }

  async getPaymentMethods(): Promise<BackendPaymentMethod[]> {
    console.log("Fetching payment methods")
    return this.makeRequest<BackendPaymentMethod[]>("/medio-pago/listar")
  }
  async getRelatedProducts(productId: string): Promise<BackendRelatedProduct[]> {
    console.log(`Fetching related products for ID: ${productId}`)
    return this.makeRequest<BackendRelatedProduct[]>(`/producto/relacionados/${productId}`)
  }
}

export const apiService = new ApiService()
