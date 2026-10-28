import './Products.css'
import ProductMotion from './ProductMotion'
import ProductHero from './ProductHero'
import ProductRange from './ProductRange'
import { ProductOptions, ProductBrief, ProductFaq } from './ProductDetails'
import { RelatedProducts, ProductCta } from './RelatedProducts'

export default function ProductCategoryPage({ category }) {
  return (
    <main className='flex flex-1 flex-col'>
      <ProductMotion key={category.slug}>
        <ProductHero category={category} />
        <ProductRange category={category} />
        <ProductOptions category={category} />
        <ProductBrief category={category} />
        <ProductFaq category={category} />
        <RelatedProducts category={category} />
        <ProductCta name={category.name} />
      </ProductMotion>
    </main>
  )
}
