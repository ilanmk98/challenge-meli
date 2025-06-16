import type { Product } from '@/types/product'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import categoryBreadcrumb from './category-breadcbrumb'


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
  fullDescription: [],
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

describe('categoryBreadcrumb', () => {
  it('renders the breadcrumb navigation correctly', () => {
    render(categoryBreadcrumb(mockProduct))


    const breadcrumbContainer = screen.getByRole('navigation')
    expect(breadcrumbContainer).toBeInTheDocument()
    expect(breadcrumbContainer).toHaveClass('text-sm', 'text-blue-600')
  })

  it('displays "Volver al listado" link', () => {
    render(categoryBreadcrumb(mockProduct))

    const backLink = screen.getByText('Volver al listado')
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveClass('hover:underline', 'cursor-pointer')
  })

  it('displays category name correctly', () => {
    render(categoryBreadcrumb(mockProduct))

    const categoryName = screen.getByText('Celulares y Teléfonos')
    expect(categoryName).toBeInTheDocument()
    expect(categoryName).toHaveClass('hover:underline', 'cursor-pointer')
  })

  it('displays subcategory name correctly', () => {
    render(categoryBreadcrumb(mockProduct))

    const subcategoryName = screen.getByText('Celulares y Smartphones')
    expect(subcategoryName).toBeInTheDocument()
    expect(subcategoryName).toHaveClass('hover:underline', 'cursor-pointer')
  })

  it('displays brand name correctly', () => {
    render(categoryBreadcrumb(mockProduct))

    const brandName = screen.getByText('Samsung')
    expect(brandName).toBeInTheDocument()
    expect(brandName).toHaveClass('hover:underline', 'cursor-pointer')
  })

  it('displays breadcrumb separators', () => {
    render(categoryBreadcrumb(mockProduct))

    const separators = screen.getAllByText('›')
    expect(separators).toHaveLength(3)

    separators.forEach(separator => {
      expect(separator).toHaveClass('mx-2')
    })
  })

  it('has correct container styling', () => {
    render(categoryBreadcrumb(mockProduct))

    const outerContainer = screen.getByRole('navigation').closest('div')
    expect(outerContainer?.parentElement).toHaveClass('bg-white', 'border-b')

    const innerContainer = screen.getByRole('navigation').parentElement
    expect(innerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'py-2')
  })

  it('renders with different product data', () => {
    const differentProduct: Product = {
      ...mockProduct,
      category: {
        id: 2000,
        name: 'Electrónicos',
        subcategory: {
          id: 2001,
          name: 'Laptops'
        }
      },
      brand: 'Apple'
    }

    render(categoryBreadcrumb(differentProduct))

    expect(screen.getByText('Electrónicos')).toBeInTheDocument()
    expect(screen.getByText('Laptops')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('maintains proper breadcrumb order', () => {
    render(categoryBreadcrumb(mockProduct))

    const nav = screen.getByRole('navigation')
    const textContent = nav.textContent


    expect(textContent).toBe('Volver al listado›Celulares y Teléfonos›Celulares y Smartphones›Samsung')
  })

  it('handles edge cases with empty or undefined values gracefully', () => {
    const edgeCaseProduct: Product = {
      ...mockProduct,
      category: {
        id: 0,
        name: '',
        subcategory: {
          id: 0,
          name: ''
        }
      },
      brand: ''
    }

    render(categoryBreadcrumb(edgeCaseProduct))


    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Volver al listado')).toBeInTheDocument()
  })
})