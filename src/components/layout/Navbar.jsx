"use client"

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const navItems = [
    { item: 'Home', href: '/' },
    { item: 'About', href: '/about' },
    {
        item: 'Products',
        href: '/products',
        subItems: [
            { name: 'Labels', href: '/products/labels' },
            { name: 'Heat Transfer Labels', href: '/products/heat-transfer-labels' },
            { name: 'Paper Items', href: '/products/paper-items' },
            { name: 'Narrow Items', href: '/products/narrow-items' },
            { name: 'Poly Bags & Lock Strings', href: '/products/poly-bags-lock-strings' },
            { name: 'Thermal Transfer Ribbons', href: '/products/thermal-transfer-ribbons' },
        ],
    },
    { item: 'Services', href: '/services' },
    { item: 'Contact Us', href: '/contact' },
]

export default function Navbar({ id, mobileOpen = false, onNavigate }) {
    const [subMenu, setSubMenu] = useState(null)
    const subMenuTriggerRef = useRef(null)
    const menuId = useId()

    useEffect(() => {
        if (subMenu === null) return

        function handleClick(event) {
            if (!subMenuTriggerRef.current?.contains(event.target)) {
                setSubMenu(null)
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [subMenu])

    function handleNavigate() {
        setSubMenu(null)
        onNavigate?.()
    }

    return (
        <nav
            id={id}
            aria-label='Main navigation'
            className={`order-4 w-full min-w-0 border-t border-gray-100 pt-2 lg:order-2 lg:block lg:w-auto lg:flex-1 lg:border-0 lg:pt-0 ${mobileOpen ? 'block' : 'hidden'}`}
        >
            <ul className='flex max-h-[calc(100dvh-10rem)] flex-col gap-1 overflow-y-auto overscroll-contain pb-2 lg:max-h-none lg:flex-row lg:items-center lg:justify-center lg:gap-5 lg:overflow-visible lg:pb-0 xl:gap-8'>
                {navItems.map((navItem) => {
                    const isOpen = subMenu === navItem.href
                    const subMenuId = `${menuId}-${navItem.item.toLowerCase()}`

                    return (
                        <li
                            key={navItem.href}
                            className='relative text-black'
                            onPointerEnter={(event) => {
                                if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1024px)').matches && navItem.subItems) {
                                    setSubMenu(navItem.href)
                                }
                            }}
                            onPointerLeave={(event) => {
                                if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1024px)').matches && !event.currentTarget.contains(document.activeElement)) {
                                    setSubMenu(null)
                                }
                            }}
                            onBlur={(event) => {
                                if (!event.currentTarget.contains(event.relatedTarget)) {
                                    setSubMenu(null)
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape' && isOpen) {
                                    event.preventDefault()
                                    setSubMenu(null)
                                    event.currentTarget.querySelector('button')?.focus()
                                }
                            }}
                        >
                            {navItem.subItems ? (
                                <button
                                    ref={subMenuTriggerRef}
                                    type='button'
                                    aria-expanded={isOpen}
                                    aria-controls={subMenuId}
                                    onClick={() => setSubMenu((current) => current === navItem.href ? null : navItem.href)}
                                    className='flex min-h-11 w-full items-center justify-between gap-2 rounded px-3 py-2 text-base lg:w-auto lg:justify-start lg:px-0 hover:text-[#B92220] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220]'
                                >
                                    {navItem.item}
                                    <ChevronDown size={20} aria-hidden='true' className={isOpen ? 'rotate-180' : ''} />
                                </button>
                            ) : (
                                <Link
                                    href={navItem.href}
                                    onClick={handleNavigate}
                                    className='flex min-h-11 items-center whitespace-nowrap rounded px-3 py-2 text-base lg:px-0 hover:text-[#B92220] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B92220]'
                                >
                                    {navItem.item}
                                </Link>
                            )}

                            {navItem.subItems && (
                                <ul
                                    id={subMenuId}
                                    hidden={!isOpen}
                                    className='relative ml-3 w-auto rounded-md border-l border-gray-200 bg-gray-50 py-1 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:ml-0 lg:w-64 lg:border-0 lg:bg-white lg:py-2 lg:shadow-lg'
                                >
                                    {navItem.subItems.map((subItem) => (
                                        <li key={subItem.href}>
                                            <Link
                                                href={subItem.href}
                                                onClick={handleNavigate}
                                                className='flex min-h-11 items-center break-words px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#B92220] focus-visible:bg-gray-50 focus-visible:text-[#B92220] focus-visible:outline-2 focus-visible:outline-[#B92220]'
                                            >
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
