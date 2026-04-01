import { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import MySkills from './MySkills.jsx'
import Contact from './Contact.jsx'
import Preloader from './Preloader.jsx'
import ChatBot from './ChatBot.jsx'
import TargetCursor from '../hooks/TargetCursor'
import { useTheme } from '../contexts/ThemeContext'

function Portfolio() {
  const { isDarkMode: dark } = useTheme()
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('has-loaded'))

  /* Preloader */
  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem('has-loaded', 'true')
      }, 3500)
      return () => clearTimeout(t)
    }
  }, [loading])

  /* ── Scroll Progress Bar ──────────────────────────────────── */
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Scroll Reveal Observer ───────────────────────────────── */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [loading]) // re-run after preloader hides

  /* ── Back-to-top Button ───────────────────────────────────── */
  useEffect(() => {
    const btn = document.getElementById('back-to-top')
    if (!btn) return
    const onScroll = () => btn.classList.toggle('visible', window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (loading) return <Preloader />

  return (
    <div style={{
      backgroundColor: dark ? '#08080f' : '#f8f7ff',
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
    }}>
      {/* Scroll progress bar */}
      <div id="scroll-progress" />

      {/* Custom cursor */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <Navbar />

      <main className="relative z-10">
        <section id="home" className="min-h-screen">
          <Home />
        </section>
        <section id="about" className="min-h-screen">
          <About />
        </section>
        <section id="skills" className="min-h-screen">
          <MySkills />
        </section>
        <section id="contact" className="min-h-screen">
          <Contact />
        </section>
      </main>

      {/* Back to top */}
      <button id="back-to-top" aria-label="Back to top">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          style={{ width: 18, height: 18 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}

export default Portfolio
