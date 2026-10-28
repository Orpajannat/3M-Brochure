import LabelsPage from '@/components/labels/LabelsPage'
import { getProductCategory } from '@/components/products/product-data'

const category = getProductCategory('labels')

export const metadata = {
  title: 'Labels | 3M Label Limited',
  description: category.description,
}

export default function ProductPage() {
  return <LabelsPage />
}
