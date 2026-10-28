import Image from 'next/image'
import Link from 'next/link'

export default function Herobanner() {
    return (
        <section className='relative isolate flex h-244 w-full shrink-0 items-center overflow-hidden bg-neutral-950'>
            <Image
                src='/image/Hero.jpg'
                alt='3M Label Limited herobanner'
                fill
                priority
                sizes='100vw'
                className='object-cover object-center'
            />

            <div aria-hidden='true' className='absolute inset-0 bg-black/50' />

            <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-center gap-5 px-4 py-8 text-white sm:gap-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
                <h1 className='max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-6xl xl:text-7xl'>
                    Branding Programs for Leading Retailers
                </h1>
                <p className='max-w-xl text-sm leading-relaxed sm:text-base lg:text-lg'>
                    A Canada-based multinational garment accessories manufacturer and supplier.
                </p>
                <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4'>
                    <Link
                        href='/products'
                        className='flex min-h-11 items-center justify-center rounded-md border border-white px-6 py-3 text-center text-sm font-medium hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
                    >
                        View Products
                    </Link>
                    <Link
                        href='/contact'
                        className='flex min-h-11 items-center justify-center rounded-md bg-[#B92220] px-6 py-3 text-center text-sm font-medium hover:bg-[#8f1a18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
                    >
                        Request a Quote
                    </Link>
                </div>
            </div>
        </section>
    )
}
