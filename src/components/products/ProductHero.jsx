import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react'
import { productCategories } from './product-data'

export default function ProductHero({ category }) {
  return (
    <section className='products-hero' aria-labelledby='product-page-title'>
      <div className='products-hero-grid' aria-hidden='true' />
      <div className='products-container'>
        <nav className='products-breadcrumb' aria-label='Breadcrumb'><Link href='/'>Home</Link><span aria-hidden='true'>/</span><Link href='/products'>Products</Link><span aria-hidden='true'>/</span><span aria-current='page'>{category.name}</span></nav>
        <div className='products-hero-layout'>
          <div className='products-hero-copy'>
            <span className='products-eyebrow'><span />{category.name.toUpperCase()}</span>
            <h1 id='product-page-title'>{category.title[0]}<br /><span>{category.title[1]}</span></h1>
            <p>{category.description}</p>
            <div className='products-actions'><a href='#product-range' className='products-primary-button'>Explore the collection <ArrowDown size={18} aria-hidden='true' /></a><Link href='/contact' className='products-text-link'>Discuss your requirements <ArrowUpRight size={18} aria-hidden='true' /></Link></div>
            <ul className='products-hero-highlights'>{category.highlights.map((item) => <li key={item}><Check size={13} aria-hidden='true' />{item}</li>)}</ul>
          </div>
          <div className='products-hero-visual'>
            <div className='products-hero-photo'><Image src={`/image/products/${category.heroImage}.webp`} alt={category.heroAlt} fill preload sizes='(min-width: 1024px) 44vw, 90vw' className='products-contain-image' /></div>
            <span className='products-collection-number' aria-hidden='true'>{category.number}<span>/ 06</span></span>
            <div className='products-photo-caption'><span>THE PRODUCT COLLECTION</span><strong>{category.name}</strong><ArrowUpRight size={21} aria-hidden='true' /></div>
          </div>
        </div>
      </div>
      <nav className='products-category-nav' aria-label='Product categories'><ul className='products-container'>{productCategories.map((item) => <li key={item.slug}><Link href={`/products/${item.slug}`} aria-current={category.slug === item.slug ? 'page' : undefined}><span>{item.number}</span>{item.shortName}</Link></li>)}</ul></nav>
    </section>
  )
}
