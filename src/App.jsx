import About from './components/About'
import Challenge from './components/Challenge'
import ContactFooter from './components/ContactFooter'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Solutions from './components/Solutions'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Challenge />
        <Services />
        <Solutions />
        <ContactFooter />
      </main>
    </>
  )
}
