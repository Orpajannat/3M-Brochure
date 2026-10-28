import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import './Products.css'
import ProductMotion from './ProductMotion'
import { ProductCta } from './RelatedProducts'
import { productCategories } from './product-data'

export default function ProductsOverview() {
  return (
    <main className='flex flex-1 flex-col'>
      <ProductMotion>
        <section className='products-overview-hero' aria-labelledby='products-title'><div className='products-container'><nav className='products-breadcrumb' aria-label='Breadcrumb'><Link href='/'>Home</Link><span aria-hidden='true'>/</span><span aria-current='page'>Products</span></nav><div className='products-overview-heading'><div><span className='products-eyebrow'><span />THE 3M LABEL COLLECTION</span><h1 id='products-title'>Every detail.<br /><span>One collection.</span></h1></div><div><p>Labels, printed paper, garment trims, and packaging. Explore six product families built around the details of your branding program.</p><a href='#product-categories' className='products-text-link'>Find your product category <ArrowDown size={18} aria-hidden='true' /></a></div></div></div></section>
        <section id='product-categories' className='products-section' aria-labelledby='products-categories-title'><div className='products-container'><div className='products-heading-row' data-product-reveal><div className='products-section-heading'><span className='products-eyebrow'><span />FIND YOUR FINISHING TOUCH</span><h2 id='products-categories-title'>Explore <span>the possibilities.</span></h2></div><span className='products-catalog-count'>06 PRODUCT CATEGORIES</span></div><div className='products-overview-grid'>{productCategories.map((item, index) => <Link key={item.slug} href={`/products/${item.slug}`} className='products-overview-card' data-product-reveal style={{ '--product-delay': `${(index % 3) * 80}ms` }}><div className='products-overview-image'><Image src={`/image/products/${item.heroImage}.webp`} alt={item.heroAlt} fill sizes='(min-width: 1024px) 29vw, (min-width: 640px) 45vw, 90vw' className='products-contain-image' /><span>{item.number}</span></div><div className='products-overview-copy'><h3>{item.name}<ArrowUpRight size={21} aria-hidden='true' /></h3><p>{item.description}</p><span>Explore the collection <ArrowUpRight size={15} aria-hidden='true' /></span></div></Link>)}</div></div></section>
        <ProductCta />
      </ProductMotion>
    </main>
  )
}
