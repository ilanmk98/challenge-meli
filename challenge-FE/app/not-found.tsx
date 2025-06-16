"use client"

import Header from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Página no encontrada</h2>
            <p className="text-gray-600 mb-4">La página que estás buscando no existe o ha sido movida.</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Verifica que la URL sea correcta</p>
              <p>O regresa al inicio para explorar nuestros productos</p>
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Volver atrás
              </button>
              <Link href="/producto/1" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block">
                Ir a ver un producto
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
