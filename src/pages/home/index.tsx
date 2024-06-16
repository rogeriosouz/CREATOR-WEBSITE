import { Header } from '@/components/header'
import { Helmet } from 'react-helmet-async'

import { Hero } from './components/hero'
import { About } from './components/about'
import { Footer } from './components/footer'

export function Home() {
  return (
    <>
      <Helmet>
        <title>home</title>
      </Helmet>

      <Header />

      <Hero />
      <About />
      <Footer />
    </>
  )
}
