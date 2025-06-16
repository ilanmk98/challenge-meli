
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { PaymentMethod, Product } from "@/types/product"
import Image from "next/image"


export default function paymentMethodCard(product: Product, paymentMethods: PaymentMethod[]) {
  return <Card>
    <CardContent className="p-6">
      <h3 className="font-medium mb-4">Medios de pago</h3>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">$</span>
            </div>
            <span className="text-sm font-medium">
              ¡Paga en hasta {product.price.installments.count} cuotas sin interés!
            </span>
          </div>
        </div>

        <Separator />


        <div>
          <h4 className="text-sm font-medium mb-2">Tarjetas de crédito</h4>
          <p className="text-xs text-gray-600 mb-3">¡Cuotas sin interés con bancos seleccionados!</p>
          <div className="flex gap-2 flex-wrap">
            {paymentMethods
              .filter((method) => method.type === "credit")
              .map((method, index) => (
                <div
                  key={index}
                  className="w-12 h-8 bg-white border rounded flex items-center justify-center"
                >
                  <Image
                    src={method.logo || "/placeholder.svg"}
                    alt={method.name}
                    width={32}
                    height={20}
                    className="object-contain" />
                </div>
              ))}
          </div>
        </div>


        <div>
          <h4 className="text-sm font-medium mb-2">Tarjetas de débito</h4>
          <div className="flex gap-2">
            {paymentMethods
              .filter((method) => method.type === "debit")
              .map((method, index) => (
                <div
                  key={index}
                  className="w-12 h-8 bg-white border rounded flex items-center justify-center"
                >
                  <Image
                    src={method.logo || "/placeholder.svg"}
                    alt={method.name}
                    width={32}
                    height={20}
                    className="object-contain" />
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Efectivo</h4>
          <div className="flex gap-2">
            {paymentMethods
              .filter((method) => method.type === "cash")
              .map((method, index) => (
                <div
                  key={index}
                  className="w-12 h-8 bg-white border rounded flex items-center justify-center"
                >
                  <Image
                    src={method.logo || "/placeholder.svg"}
                    alt={method.name}
                    width={32}
                    height={20}
                    className="object-contain" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <Button variant="link" className="text-blue-500 text-sm p-0 mt-4">
        Conoce otros medios de pago
      </Button>
    </CardContent>
  </Card>
}