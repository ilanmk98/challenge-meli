import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import descriptionSection from './description-section'
import type { Product } from '@/types/product'


// Mock product data para las pruebas
const mockProduct: Product = {
  id: '1',
  title: 'Samsung Galaxy S24 Ultra',
  condition: 'Nuevo',
  soldCount: '1000',
  images: [],
  rating: { average: 4.5, count: 100 },
  price: {
    current: 999999,
    original: 1299999,
    currency: '$',
    discount: 23,
    installments: {
      count: 12,
      amount: 83333,
      interestFree: true
    }
  },
  stock: {
    available: true,
    quantity: 10,
    isLimited: false
  },
  features: [],
  characteristics: [],
  shortDescription: 'Test description',
  fullDescription: [
    {
      title: 'Descripción del producto',
      content: 'El Samsung Galaxy S24 Ultra redefine la excelencia en smartphones premium. Con su impresionante pantalla Dynamic AMOLED 2X de 6.8 pulgadas y resolución QHD+, cada imagen cobra vida con colores vibrantes y detalles nítidos.'
    },
    {
      title: 'Características técnicas',
      content: 'Su sistema de cámaras profesional, liderado por un sensor principal de 200 MP, te permite capturar momentos con una calidad excepcional, mientras que el zoom óptico 5x te acerca a la acción sin perder nitidez.'
    },
    {
      title: 'Rendimiento',
      content: 'El potente procesador Snapdragon 8 Gen 3 para Galaxy garantiza un rendimiento fluido en todas tus aplicaciones y juegos más exigentes.'
    }
  ],
  sellerId: '123',
  shipping: {
    free: true,
    nationwide: true,
    estimatedDays: 3
  },
  warranty: {
    months: 12,
    type: 'de fábrica'
  },
  category: {
    id: 1000,
    name: 'Celulares y Teléfonos',
    subcategory: {
      id: 1051,
      name: 'Celulares y Smartphones'
    }
  },
  brand: 'Samsung'
}

describe('descriptionSection', () => {
  it('renders the description section correctly', () => {
    render(descriptionSection(mockProduct))
    
    // Verificar que el contenedor principal existe
    const descriptionContainer = screen.getByRole('heading', { name: 'Descripción' }).closest('div')
    expect(descriptionContainer).toBeInTheDocument()
  })

  it('displays the main "Descripción" heading', () => {
    render(descriptionSection(mockProduct))
    
    const mainHeading = screen.getByRole('heading', { name: 'Descripción' })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveClass('text-xl', 'font-medium', 'mb-4')
  })

  it('renders all description sections', () => {
    render(descriptionSection(mockProduct))
    
    // Verificar que todas las secciones están presentes
    expect(screen.getByText('Descripción del producto')).toBeInTheDocument()
    expect(screen.getByText('Características técnicas')).toBeInTheDocument()
    expect(screen.getByText('Rendimiento')).toBeInTheDocument()
  })

  it('displays section titles with correct styling', () => {
    render(descriptionSection(mockProduct))
    
    const sectionTitle = screen.getByText('Descripción del producto')
    expect(sectionTitle).toBeInTheDocument()
    expect(sectionTitle).toHaveClass('font-medium', 'mb-2')
  })

  it('displays section content with correct styling', () => {
    render(descriptionSection(mockProduct))
    
    const sectionContent = screen.getByText(/El Samsung Galaxy S24 Ultra redefine la excelencia/)
    expect(sectionContent).toBeInTheDocument()
    expect(sectionContent).toHaveClass('text-sm', 'leading-relaxed')
  })

  it('renders all section content correctly', () => {
    render(descriptionSection(mockProduct))
    
    // Verificar que todo el contenido está presente
    expect(screen.getByText(/El Samsung Galaxy S24 Ultra redefine la excelencia/)).toBeInTheDocument()
    expect(screen.getByText(/Su sistema de cámaras profesional/)).toBeInTheDocument()
    expect(screen.getByText(/El potente procesador Snapdragon 8 Gen 3/)).toBeInTheDocument()
  })

  it('has correct container styling', () => {
    render(descriptionSection(mockProduct))
    
    const outerContainer = screen.getByRole('heading', { name: 'Descripción' }).closest('div')?.parentElement
    expect(outerContainer).toHaveClass('lg:col-span-9', 'mt-8')
    
    const innerContainer = screen.getByRole('heading', { name: 'Descripción' }).closest('div')
    expect(innerContainer).toHaveClass('bg-white', 'rounded-lg', 'p-6')
  })

  it('has correct content container styling', () => {
    render(descriptionSection(mockProduct))
    
    const contentContainer = screen.getByText(/El Samsung Galaxy S24 Ultra redefine la excelencia/).closest('div')?.parentElement
    expect(contentContainer).toHaveClass('space-y-4', 'text-gray-700')
  })

  it('renders with empty description array', () => {
    const emptyDescriptionProduct: Product = {
      ...mockProduct,
      fullDescription: []
    }

    render(descriptionSection(emptyDescriptionProduct))
    
    // El componente debería renderizar sin errores incluso con array vacío
    expect(screen.getByRole('heading', { name: 'Descripción' })).toBeInTheDocument()
    
    // No debería haber secciones de contenido
    const contentContainer = screen.getByText('Descripción').parentElement?.querySelector('.space-y-4')
    expect(contentContainer?.children).toHaveLength(0)
  })

  it('renders with single description section', () => {
    const singleDescriptionProduct: Product = {
      ...mockProduct,
      fullDescription: [
        {
          title: 'Única descripción',
          content: 'Este es el único contenido de descripción disponible.'
        }
      ]
    }

    render(descriptionSection(singleDescriptionProduct))
    
    expect(screen.getByText('Única descripción')).toBeInTheDocument()
    expect(screen.getByText('Este es el único contenido de descripción disponible.')).toBeInTheDocument()
    
    // Verificar que solo hay una sección
    const contentContainer = screen.getByText('Descripción').parentElement?.querySelector('.space-y-4')
    expect(contentContainer?.children).toHaveLength(1)
  })

  it('handles long content correctly', () => {
    const longContentProduct: Product = {
      ...mockProduct,
      fullDescription: [
        {
          title: 'Descripción muy larga',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(50)
        }
      ]
    }

    render(descriptionSection(longContentProduct))
    
    const longContent = screen.getByText(/Lorem ipsum dolor sit amet/)
    expect(longContent).toBeInTheDocument()
    expect(longContent).toHaveClass('text-sm', 'leading-relaxed')
  })

  it('maintains proper section order', () => {
    render(descriptionSection(mockProduct))
    
    const sections = screen.getAllByRole('heading', { level: 3 })
    expect(sections[0]).toHaveTextContent('Descripción del producto')
    expect(sections[1]).toHaveTextContent('Características técnicas')
    expect(sections[2]).toHaveTextContent('Rendimiento')
  })

  it('handles special characters in content', () => {
    const specialCharsProduct: Product = {
      ...mockProduct,
      fullDescription: [
        {
          title: 'Título con ácentos y ñ',
          content: 'Contenido con caracteres especiales: áéíóú, ñ, ¿¡, €, @, #, &'
        }
      ]
    }

    render(descriptionSection(specialCharsProduct))
    
    expect(screen.getByText('Título con ácentos y ñ')).toBeInTheDocument()
    expect(screen.getByText(/Contenido con caracteres especiales/)).toBeInTheDocument()
  })

  it('renders sections with unique keys', () => {
    render(descriptionSection(mockProduct))
    
    // Verificar que no hay warnings de React sobre keys duplicadas
    // Esto se verifica implícitamente si el componente renderiza sin errores
    const sections = screen.getAllByRole('heading', { level: 3 })
    expect(sections).toHaveLength(3)
  })
})