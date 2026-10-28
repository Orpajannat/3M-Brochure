import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export default function ProductRange({ category }) {
  return (
    <section id='product-range' className='products-section' aria-labelledby='product-range-title'>
      <div className='products-container'>
        <div className='products-heading-row' data-product-reveal><div className='products-section-heading'><span className='products-eyebrow'><span />EXPLORE THE RANGE</span><h2 id='product-range-title'>{category.rangeTitle[0]}<br /><span>{category.rangeTitle[1]}</span></h2></div><p className='products-heading-aside'>{category.rangeDescription}</p></div>
        <div className='products-range-grid'>
          {category.products.map((product, index) => (
            <article key={product.name} className='products-range-card' data-product-reveal style={{ '--product-delay': `${(index % 2) * 90}ms` }}>
              <div className='products-range-image'><Image src={`/image/products/${product.image}.webp`} alt={product.alt} fill sizes='(min-width: 1024px) 42vw, (min-width: 640px) 45vw, 90vw' className='products-contain-image' /><span className='products-image-index'>0{index + 1}</span><div className='products-image-tags'>{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              <div className='products-range-copy'><h3>{product.name}</h3><p>{product.description}</p><a href={`mailto:jahirul@3mlabel.com?subject=${encodeURIComponent(`${category.name} enquiry: ${product.name}`)}`} className='products-card-enquiry' aria-label={`Enquire about ${product.name}`}>Enquire about this product <ArrowUpRight size={18} aria-hidden='true' /></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
