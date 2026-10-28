import LabelsPage from '@/components/labels/LabelsPage'
import { getProductCategory } from '@/components/products/product-data'

export const metadata = {
  title: 'Labels | 3M Label Limited',
  description: getProductCategory('labels').description,
}

export default function Page() {
  return <LabelsPage />
}
