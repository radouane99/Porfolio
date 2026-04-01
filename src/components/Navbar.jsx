import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "../assets/img/1.png";
import logoDark from "../assets/img/2.png";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from "../contexts/ThemeContext";

const NAV_ITEMS = [
  { key: 'Home',         labelKey: 'nav.home',         id: 'home' },
  { key: 'About',        labelKey: 'nav.about',         id: 'about' },
  { key: 'Skills',       labelKey: 'nav.skills',        id: 'skills' },
  { key: 'Certificates', labelKey: 'nav.certificates',  id: 'certificates', external: '/certificates' },
  { key: 'Contact',      labelKey: 'nav.contact',       id: 'contact' },
];

const Navbar = () => {
  const { isDarkMode: dark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const location  = useLocation();
  const navigate  = useNavigate();

  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeNav,  setActiveNav]  = useState('home');

  const isHome = location.pathname === '/' || location.pathname === '/Portfolio';

  /* ── scroll events ─────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveNav(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, id) => {
    if (e?.preventDefault) e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const handleLinkClick = (e, item) => {
    if (item.external) {
      // let default navigation happen
      setMenuOpen(false);
      return;
    }
    if (!isHome) {
      e.preventDefault();
      navigate(`/#${item.id}`);
      setMenuOpen(false);
    } else {
      scrollTo(e, item.id);
    }
  };

  return (
    <>
      {/* ── Main Nav ──────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        className={`w-full fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 xl:px-16 py-4
          flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? dark
              ? 'glass border-b border-white/8 shadow-2xl shadow-black/30'
              : 'bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <a
          href={isHome ? '#home' : '/'}
          onClick={(e) => isHome ? scrollTo(e, 'home') : (e.preventDefault(), navigate('/'))}
          className="cursor-target flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="relative flex items-center">
            {/* Logo Icon / Bracket style */}
            <div className={`mr-2 flex items-center justify-center w-9 h-9 rounded-xl border-2 transition-all duration-500 group-hover:rotate-12 ${
              dark ? 'bg-violet-500/10 border-violet-500/30' : 'bg-violet-50 border-violet-200'
            }`}>
              <span className={`font-bold text-xl ${dark ? 'text-violet-400' : 'text-violet-600'}`}>R</span>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col leading-tight">
              <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
                dark ? 'text-white' : 'text-gray-900'
              }`}>
                EL-ASRI
              </span>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500 rounded-full" />
            </div>
          </div>
        </a>

        {/* Desktop Links – pill container */}
        <ul className={`hidden md:flex items-center gap-1 rounded-full px-3 py-2 border
          ${dark
            ? 'glass border-white/10'
            : 'bg-white/70 border-violet-100 backdrop-blur-md'}`}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id && isHome && !item.external;
            return (
              <li key={item.key}>
                <a
                  href={item.external || (isHome ? `#${item.id}` : `/#${item.id}`)}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`relative cursor-target px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300 inline-block ${
                    isActive
                      ? 'text-white'
                      : dark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-violet-700'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.labelKey)}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`cursor-target p-2.5 rounded-xl border transition-all duration-300 hover:scale-110
              ${dark
                ? 'glass border-white/10 text-violet-300 hover:text-white hover:border-violet-400/50'
                : 'bg-white/70 border-violet-100 text-violet-600 hover:border-violet-300 hover:bg-violet-50'}`}
          >
            {dark ? (
              /* Sun */
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              /* Moon */
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Language (desktop) */}
          <div className="hidden md:block"><LanguageSwitcher compact /></div>

          {/* Hire me button (desktop) */}
          <a
            href="#contact"
            onClick={(e) => isHome ? scrollTo(e, 'contact') : (e.preventDefault(), navigate('/#contact'))}
            className={`hidden lg:inline-flex cursor-target items-center gap-2 px-5 py-2.5 rounded-full
              text-sm font-semibold transition-all duration-300
              bg-gradient-to-r from-violet-500 to-pink-500 text-white
              hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105`}
          >
            {t('nav.explore', { defaultValue: 'Hire me' })}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Language (mobile) */}
          <div className="md:hidden"><LanguageSwitcher compact /></div>

          {/* Hamburger */}
          <button
            className="cursor-target md:hidden p-2.5 rounded-xl transition-all duration-300"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke={dark ? 'white' : '#374151'} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col py-20 px-8 shadow-2xl
                ${dark ? 'bg-[#0d0d1a] border-l border-white/8' : 'bg-white border-l border-violet-100'}`}
            >
              {/* Close */}
              <button
                onClick={() => setMenuOpen(false)}
                className={`absolute top-5 right-5 p-2 rounded-xl transition-colors
                  ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  href={item.external || (isHome ? `#${item.id}` : `/#${item.id}`)}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`text-lg font-medium py-4 border-b flex items-center gap-3
                    transition-all duration-300 hover:pl-2
                    ${dark
                      ? 'border-white/8 text-gray-300 hover:text-violet-300'
                      : 'border-violet-100 text-gray-700 hover:text-violet-700'}`}
                >
                  {t(item.labelKey)}
                </motion.a>
              ))}

              <div className="mt-6"><LanguageSwitcher /></div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                href="#contact"
                onClick={(e) => scrollTo(e, 'contact')}
                className="mt-8 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                  font-semibold text-sm text-white
                  bg-gradient-to-r from-violet-500 to-pink-500
                  hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
              >
                {t('nav.contact')}
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;