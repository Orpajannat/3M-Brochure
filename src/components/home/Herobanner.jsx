'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'

const highlights = ["Global Reach", "Sustainable Manufacturing", "Retail Compliance"]

export default function Herobanner() {
    const containerRef = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const totalScrollableHeight = rect.height - window.innerHeight
            if (totalScrollableHeight <= 0) return

            // Calculate scroll progress through the banner scene (0 to 1)
            const currentProgress = Math.min(
                Math.max(-rect.top / totalScrollableHeight, 0),
                1
            )
            setProgress(currentProgress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Calculate dynamic transforms based on scroll progress
    // Phase 1: Main Title Zoom & Fade (0.0 to 0.45)
    const titleScale = 0.8 + progress * 0.4
    const titleOpacity = progress < 0.35 ? 1 : Math.max(0, 1 - (progress - 0.35) * 6)

    // Phase 2: Floating Graphic Asset Pop-Up (0.25 to 0.65)
    const imageProgress = Math.min(Math.max((progress - 0.2) / 0.4, 0), 1)
    const imageScale = 0.6 + imageProgress * 0.5
    const imageOpacity = progress < 0.2 ? 0 : progress > 0.65 ? Math.max(0, 1 - (progress - 0.65) * 5) : Math.min(1, imageProgress * 2)

    // Phase 3: Secondary Badge & Call-To-Action Appearance (0.5 to 1.0)
    const ctaProgress = Math.min(Math.max((progress - 0.55) / 0.35, 0), 1)
    const ctaScale = 0.7 + ctaProgress * 0.3
    const ctaOpacity = Math.min(1, ctaProgress * 2)

    return (
        <section 
            ref={containerRef}
            className='relative h-[300vh] w-full bg-black text-white selection:bg-[#E53935] selection:text-white'
        >
            {/* Sticky Fullscreen Canvas */}
            <div className='sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8'>
                
                {/* Background Ambient Image & Radial Red Pulse */}
                <div 
                    className='absolute inset-0 -z-20 transition-transform duration-300 ease-out'
                    style={{ transform: `scale(${1 + progress * 0.15})` }}
                >
                    <Image
                        src='/image/Hero.jpg'
                        alt='3M Label Limited herobanner'
                        fill
                        priority
                        sizes='100vw'
                        className='object-cover object-center opacity-20 mix-blend-luminosity'
                    />
                </div>
                
                <div 
                    aria-hidden='true'
                    className='pointer-events-none absolute size-[600px] rounded-full bg-[#E53935]/20 blur-[140px] -z-10 transition-all duration-500'
                    style={{ transform: `scale(${0.8 + progress * 0.6})` }}
                />

                {/* --- ELEMENT 1: Giant Dynamic Headline (Zooms in & Disappears) --- */}
                <div 
                    className='absolute mx-auto max-w-5xl text-center transition-all duration-100 ease-out will-change-transform'
                    style={{
                        transform: `scale(${titleScale}) translateY(${(progress * -80)}px)`,
                        opacity: titleOpacity,
                        pointerEvents: titleOpacity < 0.2 ? 'none' : 'auto'
                    }}
                >
                    <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 backdrop-blur-sm'>
                        <span className='size-2 rounded-full bg-[#E53935] animate-pulse' />
                        <span className='font-mono text-[10px] tracking-[0.15em] text-[#E53935]'>
                            3M LABEL LIMITED
                        </span>
                    </div>

                    <h1 className='text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white'>
                        Branding Programs for{' '}
                        <span className='font-serif font-normal italic text-[#E53935]'>
                            Leading Retailers.
                        </span>
                    </h1>

                    <p className='mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-lg'>
                        A Canada-based multinational garment accessories manufacturer delivering uncompromised quality and global compliance.
                    </p>
                </div>


                {/* --- ELEMENT 2: Floating Product Feature (Pops up, Zooms, Disappears) --- */}
                <div 
                    className='absolute flex flex-col items-center justify-center transition-all duration-100 ease-out will-change-transform'
                    style={{
                        transform: `scale(${imageScale}) translateY(${100 - imageProgress * 100}px)`,
                        opacity: imageOpacity,
                        pointerEvents: imageOpacity < 0.2 ? 'none' : 'auto'
                    }}
                >
                    <div className='relative size-64 sm:size-80 lg:size-96 rounded-full border border-[#E53935]/30 bg-neutral-950/80 p-4 shadow-[0_0_80px_rgba(229,57,53,0.25)] backdrop-blur-md'>
                        <div className='relative size-full overflow-hidden rounded-full border border-neutral-800'>
                            <Image
                                src='/image/Hero.jpg'
                                alt='Manufacturing detail'
                                fill
                                className='object-cover object-center filter grayscale contrast-125'
                            />
                        </div>
                    </div>
                    <div className='mt-6 flex items-center gap-2 font-mono text-xs tracking-widest text-[#E53935]'>
                        <Sparkles size={14} />
                        PRECISION MANUFACTURING
                    </div>
                </div>


                {/* --- ELEMENT 3: Interactive Badges & CTAs (Zoom & Settle into Focus) --- */}
                <div 
                    className='absolute flex flex-col items-center gap-8 text-center transition-all duration-100 ease-out will-change-transform'
                    style={{
                        transform: `scale(${ctaScale}) translateY(${80 - ctaProgress * 80}px)`,
                        opacity: ctaOpacity,
                        pointerEvents: ctaOpacity < 0.2 ? 'none' : 'auto'
                    }}
                >
                    {/* Floating Highlight Badges */}
                    <div className='flex flex-wrap justify-center gap-3 max-w-xl'>
                        {highlights.map((point) => (
                            <span
                                key={point}
                                className='inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/90 px-5 py-2.5 text-xs font-medium text-neutral-200 shadow-xl backdrop-blur-md'
                            >
                                <Check size={14} className='text-[#E53935]' />
                                {point}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                        <Link
                            href='/products'
                            className='group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#E53935] px-8 py-4 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black'
                        >
                            <span>View Products</span>
                            <ArrowUpRight size={16} className='transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                        </Link>
                        <Link
                            href='/contact'
                            className='inline-flex min-h-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 px-8 py-4 text-xs font-medium text-neutral-200 backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black'
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>

                {/* Bottom Scroll Progress Bar Indicator */}
                <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[10px] tracking-widest text-neutral-500'>
                    <span>SCROLL TO EXPLORE</span>
                    <div className='h-1 w-24 rounded-full bg-neutral-800 overflow-hidden'>
                        <div 
                            className='h-full bg-[#E53935] transition-all duration-75'
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                    <span>{Math.round(progress * 100)}%</span>
                </div>

            </div>
        </section>
    )
}