import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, Code } from 'lucide-react';
import LogoLoop from '../hooks/LogoLoop';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

// --- Icônes locales (recommandé: unifier) ---
import reactIcon from '../assets/img/physics.png';
import javascriptIcon from '../assets/img/js.png';
import typescriptIcon from '../assets/img/typescript.png';
import nodejsIcon from '../assets/img/node-js.png';
import mongodbIcon from '../assets/img/database.png';
import tailwindIcon from '../assets/img/Tailwind-CSS.png';
import figmaIcon from '../assets/img/figma.png';
import gitIcon from '../assets/img/github-sign.png';
import javaIcon from '../assets/img/java.png';
import angularjs from '../assets/img/angularjs.png';
import springboot from '../assets/img/spring-boot.png';
import SeleniumLogo from '../assets/img/Selenium_Logo.png';
import MachineLearning from '../assets/img/brain.png';
import dotNet from '../assets/img/NET.png';
import Python from '../assets/img/Python.png';
import PostgresSQL from '../assets/img/PostgresSQL.png';
import supabase_img from '../assets/img/supabase.png';

// Logos entreprises/écoles
import LOGOENS from '../assets/img/LOGO-FMPDF.png';
import EMarketLogo from '../assets/img/emarket.jpg';
import NewDev from '../assets/img/NewDev.jpeg'; // Utilisé pour InnovaPlus (à remplacer par le vrai logo si dispo)
import ISTQBLogo from '../assets/img/ISTQB.png';

// Défilement logos tech (optionnel; peut être retiré si tu unifies tout en local)
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiFigma, SiGithub } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://mongodb.com' },
  { node: <SiFigma />, title: 'Figma', href: 'https://figma.com' },
  { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' }
];

// --- Table de mapping tech (unifiée) ---
const TECH_ICONS = {
  JavaScript: javascriptIcon,
  React: reactIcon,
  TypeScript: typescriptIcon,
  'Node.js': nodejsIcon,
  MongoDB: mongodbIcon,
  'Tailwind CSS': tailwindIcon,
  Figma: figmaIcon,
  GitHub: gitIcon,
  Java: javaIcon,
  AngularJS: angularjs,
  'Spring Boot': springboot,
  Selenium: SeleniumLogo,
  'Machine Learning': MachineLearning,
  '.NET': dotNet,
  Python: Python,
  PostgreSQL: PostgresSQL,
  Supabase: supabase_img,
  // À compléter avec de vraies icônes :
  PHP: null,
  'C#': dotNet,
  'SQL Server': null
};

const normalizeCompany = (name) => name.replace(/,\s*[^,]+$/, '').trim();

const COMPANY_LOGOS = {
  'École Normale Supérieure, Fès': LOGOENS,
  'École Normale Supérieure': LOGOENS,
  'E-Market Solutions': EMarketLogo,
  InnovaPlus: NewDev,
  GASQ: ISTQBLogo
};

const getCompanyLogo = (company) =>
  COMPANY_LOGOS[company] || COMPANY_LOGOS[normalizeCompany(company)] || null;

const WorkHistory = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Safety fallback: Reveal all items after 1 second even if observer fails
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      }
    }, 1000);

    // Intersection Observer for cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    const revealEls = sectionRef.current?.querySelectorAll('.reveal');
    if (revealEls) {
      revealEls.forEach((el) => observer.observe(el));
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const getTechIcon = (tech) => TECH_ICONS[tech] || null;

  const experiences = [
    {
      role: t('about.exp1_title'),
      company: t('about.exp1_company'),
      duration: t('about.exp1_date'),
      location: t('about.location_fes'),
      description: t('about.exp1_desc'),
      technologies: ['JavaScript', 'PostgreSQL', 'React'],
      type: t('about.type_fulltime'),
      achievements: [
        t('about.exp1_a1'),
        t('about.exp1_a2'),
        t('about.exp1_a3')
      ]
    },
    {
      role: t('about.exp2_title'),
      company: t('about.exp2_company'),
      duration: t('about.exp2_date'),
      location: t('about.location_fes'),
      description: t('about.exp2_desc'),
      technologies: ['Python', 'Selenium', 'JavaScript'],
      type: t('about.type_fulltime'),
      achievements: [
        t('about.exp2_a1'),
        t('about.exp2_a2'),
        t('about.exp2_a3')
      ]
    },
    {
      role: t('about.exp3_title'),
      company: t('about.exp3_company'),
      duration: t('about.exp3_date'),
      location: t('about.location_fes'),
      description: t('about.exp3_desc'),
      technologies: ['SQL Server', 'C#'],
      type: t('about.type_internship'),
      achievements: [
        t('about.exp3_a1'),
        t('about.exp3_a2'),
        t('about.exp3_a3')
      ]
    }
  ];

  const education = [
    {
      degree: t('about.edu1_title'),
      institution: t('about.edu1_school'),
      duration: t('about.edu1_date'),
      location: t('about.location_fes'),
      description: t('about.edu1_desc'),
      status: t('about.status_progress'),
      technologies: ['Java', 'Python', 'Machine Learning'],
      courses: [t('about.edu1_c1'), t('about.edu1_c2'), t('about.edu1_c3')]
    },
    {
      degree: t('about.cert1_title'),
      institution: 'GASQ',
      duration: '2024',
      location: 'Maroc',
      description: t('about.cert1_desc'),
      status: t('about.status_certified'),
      technologies: ['Selenium'],
      courses: [t('about.cert1_c1'), t('about.cert1_c2'), t('about.cert1_c3')]
    },
    {
      degree: t('about.edu2_title'),
      institution: t('about.edu2_school'),
      duration: t('about.edu2_date'),
      location: t('about.location_fes'),
      description: t('about.edu2_desc'),
      status: t('about.status_completed'),
      technologies: ['Figma'],
      courses: [t('about.edu2_c1'), t('about.edu2_c2'), t('about.edu2_c3')]
    },
    {
      degree: t('about.edu3_title'),
      institution: t('about.edu3_school'),
      duration: t('about.edu3_date'),
      location: t('about.location_fes'),
      description: t('about.edu3_desc'),
      status: t('about.status_completed'),
      technologies: ['JavaScript', 'PostgreSQL'],
      courses: [t('about.edu3_c1'), t('about.edu3_c2')]
    }
  ];


  const Card = ({ children, className = '', ...rest }) => (
    <div
      {...rest}
      className={`cursor-target rounded-2xl border backdrop-blur-sm transition-all duration-400 ${className}`}
    >
      {children}
    </div>
  );

  const TechStack = ({ technologies }) => (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => {
        const techIcon = getTechIcon(tech);
        return (
          <div
            key={tech}
            className={`cursor-target flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-violet-500/10 border-violet-500/20 hover:border-violet-400'
                : 'bg-violet-50 border-violet-200 hover:border-violet-400'
            }`}
          >
            {techIcon && <img src={techIcon} alt={tech} className="w-4 h-4" />}
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-violet-300' : 'text-violet-700'
              }`}
            >
              {tech}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div 
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 sm:px-6 relative ${isDarkMode ? 'bg-[#08080f]' : 'bg-[#f8f7ff]'}`}
      style={isDarkMode ? {
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 60%), #08080f'
      } : {
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 60%), #f8f7ff'
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="section-tag mb-6">{t('about.my_journey')}</div>

          <h2 className={`font-head font-bold text-5xl md:text-6xl mb-6 leading-tight`}>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{t('about.title')}</span>
          </h2>

          <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('about.subtitle')}
          </p>
        </div>

        {/* Sections: Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Work Experience Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8 reveal">
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'}`}>
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold font-head ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('about.work_experience')}
              </h3>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const companyLogo = getCompanyLogo(exp.company);
                return (
                  <Card
                    key={`${exp.role}-${exp.company}`}
                    className={`card-hover reveal ${isDarkMode ? 'bg-white/4 border-white/8 card-hover-dark text-white' : 'bg-white border-violet-100 card-hover-light text-gray-900'}`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* Header with Company Logo */}
                    <div className={`p-6 border-b ${isDarkMode ? 'border-white/8' : 'border-violet-100'}`}>
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-shrink-0">
                          {companyLogo && (
                            <img src={companyLogo} alt={`${normalizeCompany(exp.company)} logo`} className="w-12 h-12 rounded" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-1 font-head ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                          <p className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>{exp.company}</p>
                        </div>

                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${isDarkMode ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' : 'bg-violet-100 text-violet-700 border-violet-200'}`}>
                          {exp.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                      
                      <div className="mb-6">
                        <h4 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                          <Award className="w-3.5 h-3.5" />
                          {t('about.achievements')}
                        </h4>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement) => (
                            <div key={achievement} className="flex items-start gap-3 group">
                              <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${isDarkMode ? 'bg-violet-400' : 'bg-violet-500'}`} />
                              <p className={`flex-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} group-hover:translate-x-1 transition-transform duration-300`}>
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                          <Code className="w-3.5 h-3.5" />
                          {t('about.technologies')}
                        </h4>
                        <TechStack technologies={exp.technologies} />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8 reveal">
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className={`text-3xl font-bold font-head ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('about.education')}
              </h3>
            </div>

            <div className="space-y-8">
              {education.map((edu, index) => {
                const institutionLogo = getCompanyLogo(edu.institution);
                return (
                <Card
                  key={`${edu.degree}-${edu.institution}`}
                  className={`card-hover reveal ${isDarkMode ? 'bg-white/4 border-white/8 card-hover-dark text-white' : 'bg-white border-violet-100 card-hover-light text-gray-900'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className={`p-6 border-b ${isDarkMode ? 'border-white/8' : 'border-violet-100'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {institutionLogo && (
                            <img src={institutionLogo} alt={`${normalizeCompany(edu.institution)} logo`} className="w-12 h-12 rounded" />
                          )}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold mb-1 font-head ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h3>
                          <p className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>{edu.institution}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        edu.status === 'In Progress'
                          ? isDarkMode ? 'bg-violet-500/20 text-violet-300 border-violet-500/30' : 'bg-violet-100 text-violet-700 border-violet-200'
                          : isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      }`}>
                        {edu.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{edu.description}</p>
                    
                    <div className="mb-6">
                      <h4 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                        <Award className="w-3.5 h-3.5" />
                        {t('about.key_courses')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span key={course} className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-violet-500/10 text-violet-300 border-violet-500/20 hover:border-violet-400' : 'bg-violet-50 text-violet-700 border-violet-200 hover:border-violet-400'}`}>
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                        <Code className="w-3.5 h-3.5" />
                        {t('about.technologies')}
                      </h4>
                      <TechStack technologies={edu.technologies} />
                    </div>
                  </div>
                </Card>
              );
              })}
            </div>
          </div>

        </div>

        {/* Removed View All Button - Everything is now visible for clarity */}

        {/* Logo Loop Section */}
        <div className="mt-20 reveal">
          <div className={`text-center mb-8`}>
            <h3 className={`text-xl font-semibold mb-1 font-head ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {t('about.tech_title')}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {t('about.tech_subtitle')}
            </p>
          </div>

          <div className="cursor-target">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor={isDarkMode ? '#08080f' : '#f8f7ff'}
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;