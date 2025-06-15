import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import paymentMethodCard from "./payment-method-card"
import type { Product, PaymentMethod } from "@/types/product"

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }: any) => (
    <img src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className={className} {...props} />
  ),
}))

describe("paymentMethodCard", () => {
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    condition: "new",
    soldCount: "100",
    images: [],
    rating: { average: 4.5, count: 100 },
    price: {
      current: 1000,
      original: 1200,
      currency: "ARS",
      discount: 20,
      installments: {
        count: 12,
        amount: 83.33,
        interestFree: true,
      },
    },
    stock: {
      available: true,
      quantity: 10,
      isLimited: false,
    },
    features: [],
    characteristics: [],
    shortDescription: "Test description",
    fullDescription: [],
    sellerId: "seller1",
    shipping: {
      free: true,
      nationwide: true,
      estimatedDays: 3,
    },
    warranty: {
      months: 12,
      type: "manufacturer",
    },
    category: {
      id: 1,
      name: "Electronics",
      subcategory: {
        id: 1,
        name: "Phones",
      },
    },
    brand: "Test Brand",
    ranking: {
      position: 1,
      subcategory: "Phones",
    },
  }

  const mockPaymentMethods: PaymentMethod[] = [
    {
      type: "credit",
      name: "Visa",
      logo: "https://example.com/visa.png",
      category: "international",
    },
    {
      type: "credit",
      name: "Mastercard",
      logo: "https://example.com/mastercard.png",
      category: "international",
    },
    {
      type: "debit",
      name: "Visa Debit",
      logo: "https://example.com/visa-debit.png",
      category: "debit",
    },
    {
      type: "cash",
      name: "Pago Fácil",
      logo: "https://example.com/pagofacil.png",
      category: "cash",
    },
    {
      type: "cash",
      name: "Rapipago",
      logo: "https://example.com/rapipago.png",
      category: "cash",
    },
  ]

  describe("Component Rendering", () => {
    it("renders all text content correctly", () => {
      const component = paymentMethodCard(mockProduct, mockPaymentMethods)
      render(component)

      expect(screen.getByText("Medios de pago")).toBeInTheDocument()
      expect(screen.getByText("¡Paga en hasta 12 cuotas sin interés!")).toBeInTheDocument()
      expect(screen.getByText("$")).toBeInTheDocument()
      expect(screen.getByText("Tarjetas de crédito")).toBeInTheDocument()
      expect(screen.getByText("¡Cuotas sin interés con bancos seleccionados!")).toBeInTheDocument()
      expect(screen.getByText("Tarjetas de débito")).toBeInTheDocument()
      expect(screen.getByText("Efectivo")).toBeInTheDocument()
      expect(screen.getByText("Conoce otros medios de pago")).toBeInTheDocument()
    })

    it("renders all payment method images with correct attributes", () => {
      const component = paymentMethodCard(mockProduct, mockPaymentMethods)
      render(component)

      // Credit cards
      const visaImage = screen.getByAltText("Visa")
      const mastercardImage = screen.getByAltText("Mastercard")
      expect(visaImage).toHaveAttribute("src", "https://example.com/visa.png")
      expect(visaImage).toHaveAttribute("width", "32")
      expect(visaImage).toHaveAttribute("height", "20")
      expect(mastercardImage).toHaveAttribute("src", "https://example.com/mastercard.png")

      // Debit cards
      const visaDebitImage = screen.getByAltText("Visa Debit")
      expect(visaDebitImage).toHaveAttribute("src", "https://example.com/visa-debit.png")

      // Cash methods
      const pagoFacilImage = screen.getByAltText("Pago Fácil")
      const rapipagoImage = screen.getByAltText("Rapipago")
      expect(pagoFacilImage).toHaveAttribute("src", "https://example.com/pagofacil.png")
      expect(rapipagoImage).toHaveAttribute("src", "https://example.com/rapipago.png")
    })
  })

  describe("Payment Method Filtering", () => {
    it("filters and renders credit payment methods correctly", () => {
      const component = paymentMethodCard(mockProduct, mockPaymentMethods)
      render(component)

      expect(screen.getByAltText("Visa")).toBeInTheDocument()
      expect(screen.getByAltText("Mastercard")).toBeInTheDocument()
    })

    it("filters and renders debit payment methods correctly", () => {
      const component = paymentMethodCard(mockProduct, mockPaymentMethods)
      render(component)

      expect(screen.getByAltText("Visa Debit")).toBeInTheDocument()
    })

    it("filters and renders cash payment methods correctly", () => {
      const component = paymentMethodCard(mockProduct, mockPaymentMethods)
      render(component)

      expect(screen.getByAltText("Pago Fácil")).toBeInTheDocument()
      expect(screen.getByAltText("Rapipago")).toBeInTheDocument()
    })

    it("handles empty payment methods array", () => {
      const component = paymentMethodCard(mockProduct, [])
      render(component)

      expect(screen.getByText("Tarjetas de crédito")).toBeInTheDocument()
      expect(screen.getByText("Tarjetas de débito")).toBeInTheDocument()
      expect(screen.getByText("Efectivo")).toBeInTheDocument()

      const images = document.querySelectorAll("img")
      expect(images).toHaveLength(0)
    })

    it("handles payment methods with only credit cards", () => {
      const onlyCreditMethods: PaymentMethod[] = [
        {
          type: "credit",
          name: "Solo Credit",
          logo: "https://example.com/credit.png",
          category: "test",
        },
      ]

      const component = paymentMethodCard(mockProduct, onlyCreditMethods)
      render(component)

      expect(screen.getByAltText("Solo Credit")).toBeInTheDocument()
      expect(screen.queryByAltText("Visa Debit")).not.toBeInTheDocument()
      expect(screen.queryByAltText("Pago Fácil")).not.toBeInTheDocument()
    })

    it("handles payment methods with only debit cards", () => {
      const onlyDebitMethods: PaymentMethod[] = [
        {
          type: "debit",
          name: "Solo Debit",
          logo: "https://example.com/debit.png",
          category: "test",
        },
      ]

      const component = paymentMethodCard(mockProduct, onlyDebitMethods)
      render(component)

      expect(screen.getByAltText("Solo Debit")).toBeInTheDocument()
      expect(screen.queryByAltText("Visa")).not.toBeInTheDocument()
      expect(screen.queryByAltText("Pago Fácil")).not.toBeInTheDocument()
    })

    it("handles payment methods with only cash methods", () => {
      const onlyCashMethods: PaymentMethod[] = [
        {
          type: "cash",
          name: "Solo Cash",
          logo: "https://example.com/cash.png",
          category: "test",
        },
      ]

      const component = paymentMethodCard(mockProduct, onlyCashMethods)
      render(component)

      expect(screen.getByAltText("Solo Cash")).toBeInTheDocument()
      expect(screen.queryByAltText("Visa")).not.toBeInTheDocument()
      expect(screen.queryByAltText("Visa Debit")).not.toBeInTheDocument()
    })
  })

  describe("Logo Handling", () => {
    it("uses placeholder when logo is empty string", () => {
      const methodsWithEmptyLogo: PaymentMethod[] = [
        {
          type: "credit",
          name: "Empty Logo",
          logo: "",
          category: "test",
        },
      ]

      const component = paymentMethodCard(mockProduct, methodsWithEmptyLogo)
      render(component)

      const image = screen.getByAltText("Empty Logo")
      expect(image).toHaveAttribute("src", "/placeholder.svg")
    })

    it("uses placeholder when logo is undefined", () => {
      const methodsWithUndefinedLogo: PaymentMethod[] = [
        {
          type: "credit",
          name: "Undefined Logo",
          logo: undefined as any,
          category: "test",
        },
      ]

      const component = paymentMethodCard(mockProduct, methodsWithUndefinedLogo)
      render(component)

      const image = screen.getByAltText("Undefined Logo")
      expect(image).toHaveAttribute("src", "/placeholder.svg")
    })

    it("uses provided logo when available", () => {
      const methodsWithLogo: PaymentMethod[] = [
        {
          type: "credit",
          name: "With Logo",
          logo: "https://example.com/logo.png",
          category: "test",
        },
      ]

      const component = paymentMethodCard(mockProduct, methodsWithLogo)
      render(component)

      const image = screen.getByAltText("With Logo")
      expect(image).toHaveAttribute("src", "https://example.com/logo.png")
    })
  })

  describe("Product Installments", () => {
    it("displays installments count from product", () => {
      const component = paymentMethodCard(mockProduct, mockPaymentMethods)
      render(component)

      expect(screen.getByText("¡Paga en hasta 12 cuotas sin interés!")).toBeInTheDocument()
    })

    it("handles different installment counts", () => {
      const productWith6Installments = {
        ...mockProduct,
        price: {
          ...mockProduct.price,
          installments: {
            count: 6,
            amount: 166.67,
            interestFree: true,
          },
        },
      }

      const component = paymentMethodCard(productWith6Installments, mockPaymentMethods)
      render(component)

      expect(screen.getByText("¡Paga en hasta 6 cuotas sin interés!")).toBeInTheDocument()
    })

    it("handles zero installments", () => {
      const productWithZeroInstallments = {
        ...mockProduct,
        price: {
          ...mockProduct.price,
          installments: {
            count: 0,
            amount: 0,
            interestFree: false,
          },
        },
      }

      const component = paymentMethodCard(productWithZeroInstallments, mockPaymentMethods)
      render(component)

      expect(screen.getByText("¡Paga en hasta 0 cuotas sin interés!")).toBeInTheDocument()
    })

    it("handles single installment", () => {
      const productWithSingleInstallment = {
        ...mockProduct,
        price: {
          ...mockProduct.price,
          installments: {
            count: 1,
            amount: 1000,
            interestFree: true,
          },
        },
      }

      const component = paymentMethodCard(productWithSingleInstallment, mockPaymentMethods)
      render(component)

      expect(screen.getByText("¡Paga en hasta 1 cuotas sin interés!")).toBeInTheDocument()
    })
  })

  describe("Map Function Coverage", () => {
    it("covers all map iterations for credit cards", () => {
      const multipleCreditMethods: PaymentMethod[] = [
        { type: "credit", name: "Credit 1", logo: "logo1.png", category: "test" },
        { type: "credit", name: "Credit 2", logo: "logo2.png", category: "test" },
        { type: "credit", name: "Credit 3", logo: "logo3.png", category: "test" },
      ]

      const component = paymentMethodCard(mockProduct, multipleCreditMethods)
      render(component)

      expect(screen.getByAltText("Credit 1")).toBeInTheDocument()
      expect(screen.getByAltText("Credit 2")).toBeInTheDocument()
      expect(screen.getByAltText("Credit 3")).toBeInTheDocument()
    })

    it("covers all map iterations for debit cards", () => {
      const multipleDebitMethods: PaymentMethod[] = [
        { type: "debit", name: "Debit 1", logo: "logo1.png", category: "test" },
        { type: "debit", name: "Debit 2", logo: "logo2.png", category: "test" },
      ]

      const component = paymentMethodCard(mockProduct, multipleDebitMethods)
      render(component)

      expect(screen.getByAltText("Debit 1")).toBeInTheDocument()
      expect(screen.getByAltText("Debit 2")).toBeInTheDocument()
    })

    it("covers all map iterations for cash methods", () => {
      const multipleCashMethods: PaymentMethod[] = [
        { type: "cash", name: "Cash 1", logo: "logo1.png", category: "test" },
        { type: "cash", name: "Cash 2", logo: "logo2.png", category: "test" },
        { type: "cash", name: "Cash 3", logo: "logo3.png", category: "test" },
      ]

      const component = paymentMethodCard(mockProduct, multipleCashMethods)
      render(component)

      expect(screen.getByAltText("Cash 1")).toBeInTheDocument()
      expect(screen.getByAltText("Cash 2")).toBeInTheDocument()
      expect(screen.getByAltText("Cash 3")).toBeInTheDocument()
    })
  })
})
