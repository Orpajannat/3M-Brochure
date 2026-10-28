import ChairmanMessage from '@/components/about/ChairmanMessage'
import CompanyStory from '@/components/about/CompanyStory'
import Herobanner from '@/components/about/Herobanner'
import KeyNumbers from '@/components/about/KeyNumbers'
import Mission from '@/components/about/Mission'
import Certifications from '@/components/home/Certifications'
import Ctabanner from '@/components/home/Ctabanner'
import Customers from '@/components/home/Customers'

export default function AboutPage() {
  return (
    <main className='flex flex-1 flex-col'>
      <Herobanner />
      <CompanyStory/>
      <Mission/>
      <KeyNumbers/>
      <ChairmanMessage/>
      <Certifications/>
      <Customers/>
      <Ctabanner/>
    </main>
  )
}
