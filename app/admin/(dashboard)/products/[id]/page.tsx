import Link from "next/link"
import ProductEditClient from "@/components/admin/product-edit-client"

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black">Edit Product</h1>
        </div>
        <Link
          href="/admin/products/list"
          className="text-xs font-bold tracking-wide text-emerald-600 hover:text-emerald-700"
        >
          Back to Products
        </Link>
      </div>

      <ProductEditClient productId={id} />
    </div>
  )
}
