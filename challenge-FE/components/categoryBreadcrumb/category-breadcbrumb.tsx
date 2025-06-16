import type { Product } from "@/types/product"

export default function categoryBreadcrumb(product: Product) {
  return <div className="bg-white border-b">
    <div className="max-w-7xl mx-auto px-4 py-2">
      <nav className="text-sm text-blue-600">
        <span className="hover:underline cursor-pointer">Volver al listado</span>
        <span className="mx-2">›</span>
        <span className="hover:underline cursor-pointer">{product.category.name}</span>
        <span className="mx-2">›</span>
        <span className="hover:underline cursor-pointer">{product.category.subcategory.name}</span>
        <span className="mx-2">›</span>
        <span className="hover:underline cursor-pointer">{product.brand}</span>
      </nav>
    </div>
  </div>
}