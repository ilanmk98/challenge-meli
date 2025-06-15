
import type { Product} from "@/types/product"


export default function descriptionSection(product: Product) {
  return <div className="lg:col-span-9 mt-8">
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-medium mb-4">Descripción</h2>
      <div className="space-y-4 text-gray-700">
        {product.fullDescription.map((section, index) => (
          <div key={index}>
            <h3 className="font-medium mb-2">{section.title}</h3>
            <p className="text-sm leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
}