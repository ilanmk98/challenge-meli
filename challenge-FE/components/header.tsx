import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, ShoppingCart, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-[#fff159] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Enviar a Capital Federal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">
              Creá tu cuenta
            </Link>
            <Link href="#" className="hover:underline">
              Ingresá
            </Link>
            <Link href="#" className="hover:underline">
              Mis compras
            </Link>
          </div>
        </div>


        <div className="flex items-center gap-4 py-3">

          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/mercadolibre-logo.png"
              alt="MercadoLibre"
              width={134}
              height={34}
              className="h-8 w-auto"
            />
          </Link>


          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="w-full pl-4 pr-12 py-3 rounded-sm border-0 shadow-sm"
              />
              <Button
                size="sm"
                className="absolute right-0 top-0 h-full px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-l-none"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>


          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Mi cuenta</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">Carrito</span>
            </Button>
          </div>
        </div>


        <div className="flex items-center gap-6 py-2 text-sm border-t border-gray-200">
          <Link href="#" className="hover:underline">
            Categorías
          </Link>
          <Link href="#" className="hover:underline">
            Ofertas
          </Link>
          <Link href="#" className="hover:underline">
            Historial
          </Link>
          <Link href="#" className="hover:underline">
            Supermercado
          </Link>
          <Link href="#" className="hover:underline">
            Moda
          </Link>
          <Link href="#" className="hover:underline">
            Vender
          </Link>
          <Link href="#" className="hover:underline">
            Ayuda
          </Link>
        </div>
      </div>
    </header>
  )
}
