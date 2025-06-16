import type { Product } from "@/types/product"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import ProductImageSection from "./product-image-section"

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt, width, height, fill, className, ...props }: any) => (
        <img
            src={src || "/placeholder.svg"}
            alt={alt}
            width={width}
            height={height}
            className={className}
            data-fill={fill}
            {...props}
        />
    ),
}))

describe("ProductImageSection", () => {
    const mockProduct: Product = {
        id: "1",
        title: "Test Product",
        condition: "new",
        soldCount: "100",
        images: [
            {
                id: "img1",
                url: "https://example.com/image1.jpg",
                alt: "Product image 1",
            },
            {
                id: "img2",
                url: "https://example.com/image2.jpg",
                alt: "Product image 2",
            },
            {
                id: "img3",
                url: "https://example.com/image3.jpg",
                alt: "Product image 3",
            },
        ],
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

    const mockSetSelectedImage = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("Component Rendering", () => {
        it("renders main image with correct attributes", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const mainImages = screen.getAllByAltText("Product image 1")
            const mainImage = mainImages.find((img) => img.getAttribute("data-fill") === "true")

            expect(mainImage).toBeInTheDocument()
            expect(mainImage).toHaveAttribute("src", "https://example.com/image1.jpg")
        })

        it("renders thumbnail images with correct dimensions", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const thumbnailImages = screen.getAllByAltText("Product image 1")
            const thumbnailImage = thumbnailImages.find((img) => img.getAttribute("width") === "64")

            expect(thumbnailImage).toHaveAttribute("width", "64")
            expect(thumbnailImage).toHaveAttribute("height", "80")
        })
    })

    describe("Selected Image State", () => {
        it("applies selected styling to first thumbnail when selectedImage is 0", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            expect(buttons[0]).toHaveClass("border-blue-500")
            expect(buttons[1]).toHaveClass("border-gray-200")
            expect(buttons[2]).toHaveClass("border-gray-200")
        })

        it("applies selected styling to second thumbnail when selectedImage is 1", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={1} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            expect(buttons[0]).toHaveClass("border-gray-200")
            expect(buttons[1]).toHaveClass("border-blue-500")
            expect(buttons[2]).toHaveClass("border-gray-200")
        })

        it("applies selected styling to third thumbnail when selectedImage is 2", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={2} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            expect(buttons[0]).toHaveClass("border-gray-200")
            expect(buttons[1]).toHaveClass("border-gray-200")
            expect(buttons[2]).toHaveClass("border-blue-500")
        })

        it("displays correct main image based on selectedImage", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={1} setSelectedImage={mockSetSelectedImage} />)

            const mainImages = screen.getAllByAltText("Product image 2")
            const mainImage = mainImages.find((img) => img.getAttribute("data-fill") === "true")

            expect(mainImage).toHaveAttribute("src", "https://example.com/image2.jpg")
        })
    })

    describe("Click Interactions", () => {
        it("calls setSelectedImage with correct index when first thumbnail is clicked", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            fireEvent.click(buttons[0])

            expect(mockSetSelectedImage).toHaveBeenCalledWith(0)
        })

        it("calls setSelectedImage with correct index when second thumbnail is clicked", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            fireEvent.click(buttons[1])

            expect(mockSetSelectedImage).toHaveBeenCalledWith(1)
        })

        it("calls setSelectedImage with correct index when third thumbnail is clicked", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            fireEvent.click(buttons[2])

            expect(mockSetSelectedImage).toHaveBeenCalledWith(2)
        })
    })

    describe("Image URL Handling", () => {

        it("uses placeholder for main image when selected image url is empty", () => {
            const productWithEmptyUrl: Product = {
                ...mockProduct,
                images: [
                    {
                        id: "img1",
                        url: "",
                        alt: "Empty URL image",
                    },
                ],
            }

            render(
                <ProductImageSection product={productWithEmptyUrl} selectedImage={0} setSelectedImage={mockSetSelectedImage} />,
            )

            const mainImages = screen.getAllByAltText("Empty URL image")
            const mainImage = mainImages.find((img) => img.getAttribute("data-fill") === "true")

            expect(mainImage).toHaveAttribute("src", "/placeholder.svg")
        })

        it("uses placeholder for main image when selected image url is undefined", () => {
            const productWithUndefinedUrl: Product = {
                ...mockProduct,
                images: [
                    {
                        id: "img1",
                        url: undefined as any,
                        alt: "Undefined URL image",
                    },
                ],
            }

            render(
                <ProductImageSection
                    product={productWithUndefinedUrl}
                    selectedImage={0}
                    setSelectedImage={mockSetSelectedImage}
                />,
            )

            const mainImages = screen.getAllByAltText("Undefined URL image")
            const mainImage = mainImages.find((img) => img.getAttribute("data-fill") === "true")

            expect(mainImage).toHaveAttribute("src", "/placeholder.svg")
        })
    })

    describe("Alt Text Handling", () => {
        it("uses product title as alt text when selected image alt is undefined", () => {
            const productWithUndefinedAlt: Product = {
                ...mockProduct,
                images: [
                    {
                        id: "img1",
                        url: "https://example.com/image1.jpg",
                        alt: undefined as any,
                    },
                ],
            }

            render(
                <ProductImageSection
                    product={productWithUndefinedAlt}
                    selectedImage={0}
                    setSelectedImage={mockSetSelectedImage}
                />,
            )

            expect(screen.getByAltText("Test Product")).toBeInTheDocument()
        })

        it("uses product title as alt text when selected image alt is empty", () => {
            const productWithEmptyAlt: Product = {
                ...mockProduct,
                images: [
                    {
                        id: "img1",
                        url: "https://example.com/image1.jpg",
                        alt: "",
                    },
                ],
            }

            render(
                <ProductImageSection product={productWithEmptyAlt} selectedImage={0} setSelectedImage={mockSetSelectedImage} />,
            )

            expect(screen.getByAltText("Test Product")).toBeInTheDocument()
        })
    })

    describe("Edge Cases", () => {
        it("handles empty images array", () => {
            const productWithNoImages: Product = {
                ...mockProduct,
                images: [],
            }

            render(
                <ProductImageSection product={productWithNoImages} selectedImage={0} setSelectedImage={mockSetSelectedImage} />,
            )

            const buttons = screen.queryAllByRole("button")
            expect(buttons).toHaveLength(0)
        })

        it("handles selectedImage index out of bounds", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={10} setSelectedImage={mockSetSelectedImage} />)

            const mainImages = screen.getAllByAltText("Test Product")
            const mainImage = mainImages.find((img) => img.getAttribute("data-fill") === "true")

            expect(mainImage).toHaveAttribute("src", "/placeholder.svg")
        })

        it("handles negative selectedImage index", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={-1} setSelectedImage={mockSetSelectedImage} />)

            const mainImages = screen.getAllByAltText("Test Product")
            const mainImage = mainImages.find((img) => img.getAttribute("data-fill") === "true")

            expect(mainImage).toHaveAttribute("src", "/placeholder.svg")
        })

    })

    describe("CSS Classes", () => {
        it("applies correct container classes", () => {
            const { container } = render(
                <ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />,
            )

            expect(container.querySelector(".lg\\:col-span-4")).toBeInTheDocument()
            expect(container.querySelector(".top-4")).toBeInTheDocument()
            expect(container.querySelector(".flex.flex-col.gap-4")).toBeInTheDocument()
        })

        it("applies correct thumbnail button classes", () => {
            render(<ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />)

            const buttons = screen.getAllByRole("button")
            expect(buttons[0]).toHaveClass("flex-shrink-0", "w-16", "h-20", "border-2", "rounded-lg", "overflow-hidden")
        })

        it("applies correct main image container classes", () => {
            const { container } = render(
                <ProductImageSection product={mockProduct} selectedImage={0} setSelectedImage={mockSetSelectedImage} />,
            )

            expect(container.querySelector(".flex-1.aspect-\\[3\\/4\\].relative")).toBeInTheDocument()
        })
    })
})
