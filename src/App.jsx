import About from './components/About'
import Challenge from './components/Challenge'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Resources from './components/Resources'
import Services from './components/Services'
import Solutions from './components/Solutions'
import WhoWeServe from './components/WhoWeServe'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Challenge />
        <About />
        <Services />
        <WhoWeServe />
        <Solutions />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
