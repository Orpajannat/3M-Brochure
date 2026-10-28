import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getProductCategory } from './product-data'

export function RelatedProducts({ category }) {
  return (
    <section className='products-section products-related-section' aria-labelledby='related-products-title'>
      <div className='products-container'>
        <div className='products-heading-row' data-product-reveal><div className='products-section-heading'><span className='products-eyebrow'><span />COMPLETE YOUR PROGRAM</span><h2 id='related-products-title'>Better, <span>together.</span></h2></div><Link href='/products' className='products-text-link'>Explore all products <ArrowUpRight size={18} aria-hidden='true' /></Link></div>
        <div className='products-related-grid'>{category.related.map((slug) => { const item = getProductCategory(slug); return <Link key={slug} href={`/products/${slug}`} className='products-related-card' data-product-reveal><div className='products-related-image'><Image src={`/image/products/${item.heroImage}.webp`} alt={item.heroAlt} fill sizes='(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 90vw' className='products-contain-image' /></div><span><strong>{item.name}</strong><ArrowUpRight size={19} aria-hidden='true' /></span></Link> })}</div>
      </div>
    </section>
  )
}

export function ProductCta({ name = 'branding' }) {
  return (
    <section className='products-cta' aria-labelledby='product-contact-title'><div className='products-cta-ring' aria-hidden='true' /><div className='products-container products-cta-layout' data-product-reveal><div><span className='products-eyebrow'><span />LET’S MAKE IT YOURS</span><h2 id='product-contact-title'>Your next collection<br />starts with a conversation.</h2><p>Talk to our team about your {name.toLowerCase()} requirements.</p></div><Link href='/contact' className='products-white-button'>Discuss your project <ArrowUpRight size={20} aria-hidden='true' /></Link></div></section>
  )
}
