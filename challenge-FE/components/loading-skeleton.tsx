import { Card, CardContent } from "@/components/ui/card"

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Image Skeleton */}
      <div className="lg:col-span-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-20 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="flex-1 aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Info Skeleton */}
      <div className="lg:col-span-5">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Section Skeleton */}
      <div className="lg:col-span-3">
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function SellerSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-1">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PaymentMethodsSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
