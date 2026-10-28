import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'

export function ProductOptions({ category }) {
  return (
    <section className='products-section products-options-section' aria-labelledby='product-options-title'>
      <div className='products-container products-options-layout'>
        <div className='products-options-visual' data-product-reveal><div className='products-options-image'><Image src={`/image/products/${category.optionsImage}.webp`} alt={category.optionsAlt} fill sizes='(min-width: 1024px) 42vw, 90vw' className='products-contain-image' /></div><span className='products-detail-stamp' aria-hidden='true'>DESIGNED AROUND<br /><strong>YOUR BRAND.</strong></span></div>
        <div data-product-reveal><div className='products-section-heading'><span className='products-eyebrow'><span />{category.optionsEyebrow}</span><h2 id='product-options-title'>{category.optionsTitle[0]}<br /><span>{category.optionsTitle[1]}</span></h2><p>{category.optionsDescription}</p></div><dl className='products-options-list'>{category.options.map((option) => <div key={option.label}><dt>{option.label}</dt><dd>{option.value}</dd></div>)}</dl><Link href='/services' className='products-text-link'>Discover our production services <ArrowUpRight size={17} aria-hidden='true' /></Link></div>
      </div>
    </section>
  )
}

export function ProductBrief({ category }) {
  return (
    <section className='products-section products-brief-section' aria-labelledby='product-brief-title'>
      <div className='products-container'>
        <div className='products-heading-row' data-product-reveal><div className='products-section-heading'><span className='products-eyebrow'><span />MADE AROUND YOUR REQUIREMENTS</span><h2 id='product-brief-title'>A better brief.<br /><span>A clearer starting point.</span></h2></div><p className='products-heading-aside'>Planning your {category.name.toLowerCase()} program? Share these details so our team can review your requirements.</p></div>
        <ol className='products-brief-grid'>{category.brief.map((item, index) => <li key={item} data-product-reveal style={{ '--product-delay': `${index * 80}ms` }}><span>0{index + 1}</span><h3>{item}</h3><ArrowUpRight size={20} aria-hidden='true' /></li>)}</ol>
        <div className='products-brief-footer' data-product-reveal><p>Bring your artwork. Tell us about your program. We’ll take it from there.</p><Link href='/contact' className='products-light-link'>Start a conversation <ArrowUpRight size={18} aria-hidden='true' /></Link></div>
      </div>
    </section>
  )
}

export function ProductFaq({ category }) {
  return (
    <section className='products-section products-faq-section' aria-label={`${category.name} frequently asked questions`}>
      <div className='products-container products-faq-layout'>
        <div className='products-section-heading' data-product-reveal><span className='products-eyebrow'><span />BEFORE YOU GET STARTED</span><h2>A little more<br /><span>about the details.</span></h2><p>Common questions about our {category.name.toLowerCase()} collection.</p><Link href='/contact' className='products-text-link'>Have another question? <ArrowUpRight size={17} aria-hidden='true' /></Link></div>
        <div className='products-faq-list'>{category.faqs.map((faq) => <details key={faq.question} data-product-reveal><summary><span>{faq.question}</span><Plus size={20} aria-hidden='true' /></summary><div><p>{faq.answer}</p></div></details>)}</div>
      </div>
    </section>
  )
}
