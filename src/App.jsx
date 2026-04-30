import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBand from './components/StatsBand'
import About from './components/About'
import Challenge from './components/Challenge'
import Pillars from './components/Pillars'
import Solutions from './components/Solutions'
import WhyUs from './components/WhyUs'
import WhoWeServe from './components/WhoWeServe'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <About />
        <Challenge />
        <Pillars />
        <Solutions />
        <WhyUs />
        <WhoWeServe />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
