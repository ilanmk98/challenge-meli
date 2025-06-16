
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types/product"
import { BadgeCheck, Shield, Undo } from "lucide-react"


export default function StockBuyCard(product: Product, quantity: number, setQuantity) {
  return <Card>
    <CardContent className="p-6">
      {/* Stock */}
      <div className="mb-6">
        {product.shipping.free && (
          <div className="flex items-start gap-3">
            <div>
              <p className="text-sm font-medium text-green-600">
                Envío gratis {product.shipping.nationwide ? "a todo el país" : ""}
              </p>
              <p className="text-xs text-gray-600">Conoce los tiempos y las formas de envío.</p>
              <p className="hover:underline cursor-pointer text-blue-600 text-xs">Calcular cuándo llega</p>
            </div>
          </div>
        )}
        <p className={`text-sm font-medium ${product.stock.available ? "text-black-800" : "text-black-600"}`}>
          {product.stock.available ? "Stock disponible" : "Sin stock"}
        </p>
        {product.stock.available && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm">Cantidad:</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {Array.from({ length: Math.min(5, product.stock.quantity) }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} unidad{num > 1 ? "es" : ""}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">({product.stock.quantity} disponibles)</span>
          </div>
        )}
      </div>


      <div className="space-y-3 mb-6">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
          disabled={!product.stock.available}
        >
          Comprar ahora
        </Button>
        <Button
          variant="outline"
          className="w-full py-3 text-blue-500 border-blue-500"
          disabled={!product.stock.available}
        >
          Agregar al carrito
        </Button>
      </div>


      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Undo className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="hover:underline cursor-pointer text-blue-600 text-sm">Devoluciones gratis.</p>
            <p className="text-xs text-gray-600">
              Tienes 30 dias desde que lo recibes.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="hover:underline cursor-pointer text-blue-600 text-sm">Compra Protegida</p>
            <p className="text-xs text-gray-600">
              Recibe el producto que esperabas o te devolvemos tu dinero.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <BadgeCheck className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-xs text-gray-600">
              {product.warranty.months} meses de garantía {product.warranty.type}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
}