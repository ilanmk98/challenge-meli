
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Seller } from "@/types/product"
import { Check, Shield } from "lucide-react"
import Image from "next/image"
import SellerRatingBar from "./seller-rating-bar"


export default function sellerCard(seller: Seller) {
    return <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">

                    <div>
                        <div className="w-12 h-12 bg-white-600 rounded-none flex items-center justify-center overflow-hidden">
                            <Image
                                src={seller.logo || "/placeholder.svg?height=48&width=48&text=S"}
                                alt={seller.name}
                                width={48}
                                height={48}
                                className="rounded-full object-cover" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                            <p className="font-medium">{seller.name}</p>
                            {seller.isVerified && (
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                        <Check className="text-white w-4 h-4" />
                                    </div>
                                    <p className="text-xs text-blue-600">Tienda oficial de Mercado Libre</p>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>

            <SellerRatingBar rating={seller.rating} />

            <div className="grid grid-cols-1 gap-4 text-center mb-4">
                <div>
                    <p className="text-lg font-bold">{seller.totalSales}</p>
                    <p className="text-xs text-gray-600">Ventas</p>
                </div>

            </div>


            <div className="space-y-2">
                {seller.guarantees.slice(0, 3).map((guarantee, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{guarantee}</span>
                    </div>
                ))}
            </div>

            <Button variant="outline" className="w-full mt-4 text-blue-500 border-blue-500">
                Ir a la Tienda oficial
            </Button>
        </CardContent>
    </Card>
}