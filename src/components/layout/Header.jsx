"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import Navbar from './Navbar'

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const headerRef = useRef(null)
    const menuButtonRef = useRef(null)
    const navigationId = useId()

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 1024px)')
        const closeMenu = () => setMobileOpen(false)
        desktop.addEventListener('change', closeMenu)
        return () => desktop.removeEventListener('change', closeMenu)
    }, [])

    useEffect(() => {
        if (!mobileOpen) return

        function handlePointerDown(event) {
            if (!headerRef.current?.contains(event.target)) {
                setMobileOpen(false)
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [mobileOpen])

    return (
        <header
            ref={headerRef}
            className='sticky top-0 z-50 shrink-0 bg-white/95 px-4 py-2 shadow-xl backdrop-blur-md sm:px-6 lg:px-8'
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setMobileOpen(false)
                }
            }}
            onKeyDown={(event) => {
                if (event.key === 'Escape' && mobileOpen && !event.defaultPrevented) {
                    event.preventDefault()
                    setMobileOpen(false)
                    menuButtonRef.current?.focus()
                }
            }}
        >
            <div className='mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-4 lg:flex-nowrap lg:gap-x-6 xl:gap-x-10'>
                <button
                    ref={menuButtonRef}
                    type='button'
                    aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
                    aria-expanded={mobileOpen}
                    aria-controls={navigationId}
                    onClick={() => setMobileOpen((current) => !current)}
                    className='order-0 flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-black hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B92220] lg:hidden'
                >
                    {mobileOpen ? <X size={24} aria-hidden='true' /> : <Menu size={24} aria-hidden='true' />}
                </button>

                <Link
                    href='/'
                    onClick={() => setMobileOpen(false)}
                    className='order-1 block w-24 shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220] sm:w-36 lg:w-44 2xl:w-50'
                >
                    <Image
                        src='/image/Header.png'
                        alt='3M Label Limited home'
                        width={200}
                        height={150}
                        sizes='(min-width: 1536px) 200px, (min-width: 1024px) 176px, (min-width: 640px) 144px, 96px'
                        className='h-auto w-full'
                    />
                </Link>

                <Navbar
                    id={navigationId}
                    mobileOpen={mobileOpen}
                    onNavigate={() => setMobileOpen(false)}
                />

                <button
                    type='button'
                    className='group relative order-2 ml-auto min-h-11 shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-[#B92220] px-3 py-2 text-xs text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220] motion-reduce:transform-none motion-reduce:transition-none sm:px-4 sm:text-sm lg:order-3 lg:ml-0 lg:text-base'
                >
                    <span aria-hidden='true' className='absolute inset-0 -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden' />
                    <span className='relative z-10'>Request a Quote</span>
                </button>
            </div>
        </header>
    )
}
