import React, { useState, useEffect, useMemo } from 'react';
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
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getTechIcon = (tech) => TECH_ICONS[tech] || null;

  const experiences = [
    {
      role: t('about.exp1_title', { defaultValue: 'Technicien Spécialisé en Développement' }),
      company: t('about.exp1_company', { defaultValue: 'École Normale Supérieure, Fès' }),
      duration: t('about.exp1_date', { defaultValue: 'Sept 2024 - Présent' }),
      location: 'Fès, Maroc',
      description: t('about.exp1_desc', {
        defaultValue:
          "Développement d'une plateforme web pour la digitalisation des tâches académiques et maintenance du parc informatique."
      }),
      technologies: ['JavaScript', 'PostgreSQL', 'React'],
      type: 'Full-time',
      achievements: [
        'Participation au développement d’une plateforme web académique',
        'Maintenance et gestion du parc informatique',
        'Amélioration des outils numériques internes'
      ]
    },
    {
      role: t('about.exp2_title', { defaultValue: 'Agent Mailer & Développeur' }),
      company: t('about.exp2_company', { defaultValue: 'E-Market Solutions, Fès' }),
      duration: t('about.exp2_date', { defaultValue: 'Oct 2019 - Juin 2024' }),
      location: 'Fès, Maroc',
      description: t('about.exp2_desc', {
        defaultValue:
          "Réalisation de campagnes d'emailing et développement de scripts d'automatisation avec Python (Selenium), JS, HTML et CSS."
      }),
      technologies: ['Python', 'Selenium', 'JavaScript'],
      type: 'Full-time',
      achievements: [
        "Réalisation de campagnes d'emailings promotionnels en masse",
        "Développement de scripts d'automatisation",
        'Réduction des erreurs humaines via l’automatisation'
      ]
    },
    {
      role: t('about.exp3_title', { defaultValue: 'Développeur WinDev (Stage)' }),
      company: t('about.exp3_company', { defaultValue: 'InnovaPlus, Fès' }),
      duration: t('about.exp3_date', { defaultValue: 'Avril 2019 - Juin 2019' }),
      location: 'Fès, Maroc',
      description: t('about.exp3_desc', {
        defaultValue:
          "Développement d'une application de gestion des congés avec WinDev et SQL Server."
      }),
      technologies: ['SQL Server', 'C#'],
      type: 'Internship',
      achievements: [
        "Développement d'une application de gestion des congés",
        'Génération de rapports et statistiques',
        'Synchronisation avec le logiciel de paie'
      ]
    }
  ];

  const education = [
    {
      degree: t('about.edu1_title', { defaultValue: "Ingénieur d'État en Génie Informatique" }),
      institution: t('about.edu1_school', { defaultValue: 'Université Privée de Fès' }),
      duration: t('about.edu1_date', { defaultValue: '2025 - 2028' }),
      location: 'Fès, Maroc',
      description:
        "Formation d'Ingénieur d'État axée sur les technologies de pointe et l'ingénierie logicielle.",
      status: 'In Progress',
      technologies: ['Java', 'Python', 'Machine Learning'],
      courses: ['Génie Logiciel', "Systèmes d'Information", 'Bases de Données']
    },
    {
      degree: t('about.cert1_title', { defaultValue: 'Certification ISTQB Foundation Level' }),
      institution: 'GASQ',
      duration: '2024',
      location: 'Maroc',
      description: 'Certification internationale reconnue en tests de logiciels.',
      status: 'Certified',
      technologies: ['Selenium'],
      courses: ['Tests Logiciels', 'Assurance Qualité', 'Automatisation des tests']
    },
    {
      degree: t('about.edu2_title', {
        defaultValue: 'Master en Marketing Digital et Ingénierie des Affaires'
      }),
      institution: t('about.edu2_school', { defaultValue: 'ENCG Fès' }),
      duration: t('about.edu2_date', { defaultValue: '2022' }),
      location: 'Fès, Maroc',
      description:
        'Formation avancée en marketing numérique, SEO, et stratégies d’acquisition.',
      status: 'Completed',
      technologies: ['Figma'],
      courses: ['Email Marketing', 'SEO Analytics', 'Inbound Marketing']
    },
    {
      degree: t('about.edu3_title', {
        defaultValue: 'Bachelor en Informatique et Réseaux'
      }),
      institution: t('about.edu3_school', { defaultValue: 'Groupe EFET, Fès' }),
      duration: t('about.edu3_date', { defaultValue: '2020' }),
      location: 'Fès, Maroc',
      description: 'Formation complète en informatique, réseaux et développement.',
      status: 'Completed',
      technologies: ['JavaScript', 'PostgreSQL'],
      courses: ['Développement Web', 'Administration Réseaux']
    }
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);
  const displayedEducation = showAll ? education : education.slice(0, 2);

  const Card = ({ children, className = '', ...rest }) => (
    <div
      {...rest}
      className={`cursor-target rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${className}`}
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
            className={`cursor-target flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'border-gray-600 bg-gray-800 hover:border-blue-400/50'
                : 'border-gray-300 bg-white hover:border-blue-300'
            }`}
          >
            {techIcon && <img src={techIcon} alt={tech} className="w-4 h-4" />}
            <span
              className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
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
    <div className={`min-h-screen py-20 px-4 sm:px-6 relative ${isDarkMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="cursor-target inline-flex items-center gap-4 mb-6">
            <div className={`w-16 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`} />
            <span className={`text-sm font-semibold tracking-widest uppercase ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
              {t('about.my_journey')}
            </span>
            <div className={`w-16 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`} />
          </div>

          <h2 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about.title')}
          </h2>

          <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('about.subtitle', { defaultValue: 'Mon parcours professionnel et académique.' })}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className={`cursor-target flex rounded-2xl p-2 backdrop-blur-sm border ${isDarkMode ? 'bg-[#0A1A3A]/80 border-blue-500/30' : 'bg-white/80 border-gray-200'}`}>
            {[
              { id: 'work', labelKey: 'about.work_experience', icon: Briefcase },
              { id: 'education', labelKey: 'about.education', icon: GraduationCap }
            ].map(({ id, labelKey, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={`cursor-target flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/5'
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="grid md:grid-cols-2 gap-8">
            {displayedEducation.map((edu, index) => (
              <Card
                key={`${edu.degree}-${edu.institution}`}
                className={`${isDarkMode ? 'bg-[#0A1A3A] border-blue-500/30 text-white' : 'bg-white border-blue-200 text-gray-900'} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className={`p-6 border-b ${isDarkMode ? 'border-blue-500/20' : 'border-blue-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h3>
                      <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{edu.institution}</p>
                    </div>
                    <span
                      className={`cursor-target px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                        edu.status === 'In Progress'
                          ? isDarkMode
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                          : isDarkMode
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-green-100 text-green-700 border border-green-200'
                      }`}
                    >
                      {edu.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{edu.description}</p>

                  {/* Courses */}
                  <div className="mb-6">
                    <h4
                      className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      <Award className="w-4 h-4" aria-hidden="true" />
                      {t('about.key_courses', { defaultValue: 'Matières Clés' })}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className={`cursor-target px-3 py-1 text-sm rounded-full border transition-all duration-300 hover:scale-105 ${
                            isDarkMode
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-blue-400'
                              : 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400'
                          }`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4
                      className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      <Code className="w-4 h-4" aria-hidden="true" />
                      {t('about.technologies', { defaultValue: 'Technologies' })}
                    </h4>
                    <TechStack technologies={edu.technologies} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Work Experience Section */}
        {activeSection === 'work' && (
          <div className="grid md:grid-cols-2 gap-8">
            {displayedExperiences.map((exp, index) => {
              const companyLogo = getCompanyLogo(exp.company);
              return (
                <Card
                  key={`${exp.role}-${exp.company}`}
                  className={`${isDarkMode ? 'bg-[#0A1A3A] border-blue-500/30 text-white' : 'bg-white border-blue-200 text-gray-900'} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Header with Company Logo */}
                  <div className={`p-6 border-b ${isDarkMode ? 'border-blue-500/20' : 'border-blue-200'}`}>
                    <div className="flex items-start gap-4 mb-3">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        {companyLogo && (
                          <img src={companyLogo} alt={`${normalizeCompany(exp.company)} logo`} className="w-12 h-12 rounded" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                        <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company}</p>
                      </div>

                      <span
                        className={`cursor-target px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                          isDarkMode
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4
                        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      >
                        <Award className="w-4 h-4" aria-hidden="true" />
                        {t('about.achievements', { defaultValue: 'Réalisations' })}
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement) => (
                          <div key={achievement} className="flex items-start gap-3 cursor-target group">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 group-hover:scale-150 ${
                                isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                              }`}
                            />
                            <p
                              className={`flex-1 text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              } group-hover:translate-x-1 transition-transform duration-300`}
                            >
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4
                        className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      >
                        <Code className="w-4 h-4" aria-hidden="true" />
                        {t('about.technologies', { defaultValue: 'Technologies' })}
                      </h4>
                      <TechStack technologies={exp.technologies} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Show More Button */}
        {((activeSection === 'work' && experiences.length > 2) ||
          (activeSection === 'education' && education.length > 2)) && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="cursor-target px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25"
            >
              {showAll
                ? t('about.show_less', { defaultValue: 'Voir moins' })
                : t('about.view_all_experiences', { defaultValue: 'Voir tout' })}
            </button>
          </div>
        )}

        {/* Logo Loop Section */}
        <div className="mt-20">
          <div className={`text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <h3 className="text-xl font-semibold mb-2 cursor-target">
              {t('about.tech_title', { defaultValue: 'Technologies avec lesquelles je travaille' })}
            </h3>
            <p className="text-sm cursor-target">
              {t('about.tech_subtitle', { defaultValue: 'Toujours à jour avec les derniers outils' })}
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
              fadeOutColor={isDarkMode ? '#050A30' : '#eff9ff'}
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;