import {
  Smartphone,
  Battery,
  Wifi,
  Bluetooth,
  Shield,
  Zap,
  Nfc,
  Speaker,
  Headphones,
  Usb,
} from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCharacteristicsProps {
  characteristics: Product["characteristics"]
}

// Función para obtener el ícono apropiado basado en el texto de la característica
const getCharacteristicIcon = (text: string) => {
  const lowerText = text.toLowerCase()

  if (lowerText.includes("batería") || lowerText.includes("bateria") || lowerText.includes("mah")) {
    return <Battery className="w-5 h-5 text-gray-500" />
  }

  if (lowerText.includes("wifi") || lowerText.includes("wi-fi")) {
    return <Wifi className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("bluetooth")) {
    return <Bluetooth className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("nfc")) {
    return <Nfc className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("audio") || lowerText.includes("sonido") || lowerText.includes("altavoz")) {
    return <Speaker className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("auricular") || lowerText.includes("jack")) {
    return <Headphones className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("usb") || lowerText.includes("conector") || lowerText.includes("puerto")) {
    return <Usb className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("carga") || lowerText.includes("w")) {
    return <Zap className="w-5 h-5 text-gray-500" />
  }
  if (lowerText.includes("resistente") || lowerText.includes("ip") || lowerText.includes("agua")) {
    return <Shield className="w-5 h-5 text-gray-500" />
  }

  // Ícono por defecto
  return <Smartphone className="w-5 h-5 text-gray-500" />
}

export default function ProductCharacteristics({ characteristics }: ProductCharacteristicsProps) {
  if (!characteristics || characteristics.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">Características del producto</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characteristics.map((characteristic, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg ">
            <div className="flex-shrink-0 mt-0.5">{getCharacteristicIcon(characteristic)}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">{characteristic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
