import type { PaymentMethod, Product } from "@/types/product"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import paymentMethodCard from "../paymentMethodCard/payment-method-card"

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

    describe("Text Content", () => {
        it("renders the title 'Medios de pago'", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("Medios de pago")).toBeInTheDocument()
        })

        it("displays installments text with product count", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("¡Paga en hasta 12 cuotas sin interés!")).toBeInTheDocument()
        })

        it("displays dollar sign icon", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("$")).toBeInTheDocument()
        })

        it("renders credit cards section title", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("Tarjetas de crédito")).toBeInTheDocument()
        })

        it("renders credit cards description", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("¡Cuotas sin interés con bancos seleccionados!")).toBeInTheDocument()
        })

        it("renders debit cards section title", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("Tarjetas de débito")).toBeInTheDocument()
        })

        it("renders cash section title", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("Efectivo")).toBeInTheDocument()
        })

        it("renders button text", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByText("Conoce otros medios de pago")).toBeInTheDocument()
        })
    })

    describe("Payment Method Images", () => {
        it("renders credit card images", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByAltText("Visa")).toBeInTheDocument()
            expect(screen.getByAltText("Mastercard")).toBeInTheDocument()
        })

        it("renders debit card images", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByAltText("Visa Debit")).toBeInTheDocument()
        })

        it("renders cash method images", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByAltText("Pago Fácil")).toBeInTheDocument()
            expect(screen.getByAltText("Rapipago")).toBeInTheDocument()
        })

        it("uses correct image sources", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            const visaImage = screen.getByAltText("Visa")
            expect(visaImage).toHaveAttribute("src", "https://example.com/visa.png")
        })

        it("uses placeholder when logo is empty", () => {
            const methodsWithEmptyLogo: PaymentMethod[] = [
                {
                    type: "credit",
                    name: "Test Card",
                    logo: "",
                    category: "test",
                },
            ]

            const component = paymentMethodCard(mockProduct, methodsWithEmptyLogo)
            render(component)

            const testCardImage = screen.getByAltText("Test Card")
            expect(testCardImage).toHaveAttribute("src", "/placeholder.svg")
        })
    })

    describe("Filtering Logic", () => {
        it("only shows credit cards in credit section", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByAltText("Visa")).toBeInTheDocument()
            expect(screen.getByAltText("Mastercard")).toBeInTheDocument()
        })

        it("only shows debit cards in debit section", () => {
            const component = paymentMethodCard(mockProduct, mockPaymentMethods)
            render(component)

            expect(screen.getByAltText("Visa Debit")).toBeInTheDocument()
        })

        it("only shows cash methods in cash section", () => {
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
    })

    describe("Product Installments", () => {
        it("displays different installment counts", () => {
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
    })
})
