import Navbar    from './components/Navbar'
import Hero       from './sections/Hero'
import Projects   from './sections/Projects'
import Hackathons from './sections/Hackathons'
import Skills     from './sections/Skills'
import Contact    from './sections/Contact'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Hackathons />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
