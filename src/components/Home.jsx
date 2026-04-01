import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import profileImage from '../assets/img/Radouane.jpg';
import resumePDF from '../assets/img/Radouane-ELASRI_CV.pdf';

// ── Typing effect hook ──────────────────────────────────────────────
function useTypingEffect(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx] ?? '';
    let timer;
    if (!deleting) {
      if (charIdx < current.length) {
        timer = setTimeout(() => setCharIdx(c => c + 1), speed);
      } else {
        timer = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      } else {
        setDeleting(false);
        setTextIdx(i => (i + 1) % texts.length);
      }
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

// ── Animated floating orb ───────────────────────────────────────────
function FloatingOrb({ style, className }) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [0, -24, 0], rotate: [0, 6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── Stat counter ────────────────────────────────────────────────────
function StatBadge({ value, label, dark }) {
  return (
    <div className={`text-center px-4 py-3 rounded-2xl ${dark
      ? 'bg-white/5 border border-white/10'
      : 'bg-white/60 border border-violet-200'}`}>
      <div className={`text-2xl font-bold grad-text font-head`}>{value}</div>
      <div className={`text-xs mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
    </div>
  );
}

// ── Scroll helper ───────────────────────────────────────────────────
const scrollTo = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ── Main Component ─────────────────────────────────────────────────
export default function Home() {
  const { isDarkMode: dark } = useTheme();
  const { t } = useTranslation();

  const roles = [
    t('home.role_dev'),
    t('home.role_react'),
    t('home.role_ui'),
    t('home.role_solver'),
  ];
  const typed = useTypingEffect(roles, 75, 2200);

  // Stagger variants
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className={`relative min-h-screen flex items-center overflow-hidden
      ${dark ? 'hero-bg-dark' : 'hero-bg-light'}`}>

      {/* ── Background decorative orbs ── */}
      <FloatingOrb
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          top: '-15%', right: '-10%',
          background: dark
            ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <FloatingOrb
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          bottom: '-10%', left: '-8%',
          background: dark
            ? 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* ── Grid dot texture ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)'
            : 'radial-gradient(rgba(139,92,246,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-28 md:py-32">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Left – Text */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-5 inline-block">
              <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border
                ${dark
                  ? 'glass border-violet-500/30 text-violet-300'
                  : 'bg-violet-50 border-violet-200 text-violet-700'}`}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                {t('home.available')}
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item}
              className={`text-base font-medium mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('home.greeting', { defaultValue: "Hi, I'm" })} 👋
            </motion.p>

            {/* Name */}
            <motion.h1 variants={item}
              className="font-head font-bold text-5xl md:text-6xl xl:text-7xl leading-tight mb-4">
              <span className={dark ? 'text-white' : 'text-gray-900'}>Radouane</span>{' '}
              <span className="grad-text">El-ASRI</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div variants={item} className="mb-6 h-9 md:h-10">
              <span className={`text-xl md:text-2xl font-mono font-medium ${dark ? 'text-violet-300' : 'text-violet-700'} typing-cursor`}>
                {typed}
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item}
              className={`max-w-lg mx-auto md:mx-0 text-base leading-relaxed mb-8
                ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('home.intro', {
                defaultValue:
                  'Computer Engineering student crafting modern web experiences — React, Node.js & beyond. Turning ideas into elegant, scalable products.'
              })}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item}
              className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, 'contact')}
                className="btn-magnetic cursor-target px-7 py-3.5 rounded-full font-semibold text-sm text-white
                  bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500
                  hover:shadow-xl hover:shadow-violet-500/30 glow-violet
                  animate-gradient transition-all duration-300"
              >
                {t('home.contact_button')}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href={resumePDF}
                download="Radouane-ELASRI_CV.pdf"
                className={`btn-magnetic cursor-target px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-300
                  ${dark
                    ? 'border-violet-500/50 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400'
                    : 'border-violet-300 text-violet-700 hover:bg-violet-50 hover:border-violet-500'}`}
              >
                {t('home.resume_button')}
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item}
              className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              <StatBadge value="7+" label={t('home.stat_exp')} dark={dark} />
              <StatBadge value="10+" label={t('home.stat_projects')} dark={dark} />
              <StatBadge value="5+" label={t('home.stat_tech')} dark={dark} />
            </motion.div>

            {/* Social links */}
            <motion.div variants={item}
              className="flex justify-center md:justify-start gap-3">
              {[
                {
                  href: 'https://github.com/radouane99',
                  label: 'GitHub',
                  icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
                },
                {
                  href: 'https://linkedin.com/in/radouaneelasri',
                  label: 'LinkedIn',
                  icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`cursor-target p-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-1
                    ${dark
                      ? 'glass border-white/10 text-gray-400 hover:text-violet-300 hover:border-violet-500/40'
                      : 'bg-white/70 border-violet-200 text-gray-600 hover:text-violet-600 hover:border-violet-400'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{icon}</svg>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – Profile image */}
          <motion.div
            className="flex-shrink-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative">
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
                  padding: '2px',
                  opacity: 0.7,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <div className={`w-full h-full rounded-full ${dark ? 'bg-[#08080f]' : 'bg-[#f3f0ff]'}`} />
              </motion.div>

              {/* Profile photo */}
              <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden
                border-4 border-transparent"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899) border-box' }}>
                <img
                  src={profileImage}
                  alt="Radouane EL-ASRI"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge – top right */}
              <motion.div
                className={`absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-xl text-xs font-bold
                  bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-lg`}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🎓 {t('home.eng_student')}
              </motion.div>

              {/* Floating badge – bottom left */}
              <motion.div
                className={`absolute -bottom-3 -left-3 z-20 px-3 py-1.5 rounded-xl text-xs font-bold
                  ${dark ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'bg-cyan-50 border border-cyan-200 text-cyan-700'}`}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                ⚡ {t('home.fullstack')}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className={`text-xs tracking-widest uppercase ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{t('home.scroll')}</span>
          <motion.div
            className={`w-0.5 h-8 rounded-full ${dark ? 'bg-gradient-to-b from-violet-500 to-transparent' : 'bg-gradient-to-b from-violet-400 to-transparent'}`}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}