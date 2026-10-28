'use client'

import { useEffect, useRef } from 'react'

export default function ProductMotion({ children }) {
  const root = useRef(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root.current || media.matches || !('IntersectionObserver' in window)) return
    const nodes = [...root.current.querySelectorAll('[data-product-reveal]')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-visible', 'true')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.06 })
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < window.innerHeight) return
      node.setAttribute('data-pending', 'true')
      observer.observe(node)
    })
    function revealAll() {
      if (!media.matches) return
      nodes.forEach((node) => node.setAttribute('data-visible', 'true'))
      observer.disconnect()
    }
    media.addEventListener('change', revealAll)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', revealAll)
      nodes.forEach((node) => node.removeAttribute('data-pending'))
    }
  }, [])

  return <div ref={root} className='products-page'>{children}</div>
}
