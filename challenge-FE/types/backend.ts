// Tipos que llegan del backend
export interface BackendPaymentMethod {
  nombre: string
  logo: string
  categoriaNombre: string
}

export interface BackendHighlight {
  texto: string
}

export interface BackendMedia {
  url: string
  tipo: "IMAGEN" | "VIDEO"
}

export interface BackendCharacteristic {
  texto: string
}

export interface BackendSubcategory {
  id: number
  nombre: string
  categoria: {
    id: number
    nombre: string
  }
}

export interface BackendProduct {
  titulo: string
  precioOriginal: number
  precioActual: number
  stockActual: number
  highlights: BackendHighlight[]
  media: BackendMedia[]
  caracteristicas: BackendCharacteristic[]
  descripcion: string
  vendedorId: number
  cuotasSinInteres: number
  calificacion: number
  subcategoria: BackendSubcategory
  porcentajeDescuento: number
  marca: string
  cantidadVendidos: number
  cantidadCalificaciones: number
  rankingSubcategoria: number 
}

export interface BackendSeller {
  nombre: string
  esVerificado: boolean
  cantidadDeVentas: number
  cantidadProductos: number
  brindaBuenaAtencion: boolean
  entregaATiempo: boolean
  foto: string
  banner: string
  calificacion: number
}
export interface BackendRelatedProduct {
  titulo: string
  precioOriginal: number
  precioActual: number
  cuotasSinInteres: number
  imagen: {
    url: string
    tipo: "IMAGEN" | "VIDEO"
  }
}
