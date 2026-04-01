import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import logoLight from "../assets/img/1.png";
import logoDark from "../assets/img/2.png";

const Footer = () => {
  const { isDarkMode: drakeMode } = useTheme();
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub",
      url: "https://github.com/radouane99",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/radouane-elasri",
      color: "hover:text-blue-400"
    }
  ];

  const quickLinks = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.contact'), href: "#contact" }
  ];

  return (
    <footer className={`relative overflow-hidden font-sans antialiased border-t ${
      drakeMode ? 'bg-[#08080f] border-white/5' : 'bg-[#f8f7ff] border-violet-100'
    }`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-20 ${
          drakeMode ? 'bg-violet-600' : 'bg-violet-400'
        }`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-10 ${
          drakeMode ? 'bg-cyan-600' : 'bg-cyan-400'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <a href="#home" className="cursor-target flex items-center gap-2 group">
              <div className="relative flex items-center">
                <div className={`mr-2 flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-500 group-hover:rotate-12 hover:shadow-lg hover:shadow-violet-500/20 ${
                  drakeMode ? 'bg-violet-500/10 border-violet-500/30' : 'bg-violet-50 border-violet-200'
                }`}>
                  <span className={`font-bold text-2xl ${drakeMode ? 'text-violet-400' : 'text-violet-600'}`}>R</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${
                    drakeMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    EL-ASRI
                  </span>
                  <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500 rounded-full" />
                </div>
              </div>
            </a>
            <p className={`max-w-md leading-relaxed text-lg ${
              drakeMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('footer.about_desc')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border ${
                    drakeMode
                      ? 'bg-white/5 border-white/10 text-violet-400 hover:bg-violet-500/20 hover:text-white hover:border-violet-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                      : 'bg-white border-violet-100 text-violet-600 hover:bg-violet-600 hover:text-white hover:border-violet-500 shadow-lg shadow-violet-500/10'
                  }`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold tracking-tight ${
              drakeMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t('footer.links_title')}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group ${
                      drakeMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3 ${
                      drakeMode ? 'bg-violet-500' : 'bg-violet-600'
                    }`} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold tracking-tight ${
              drakeMode ? 'text-white' : 'text-gray-900'
            }`}>
              {t('footer.talk_title')}
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:radouane.elasri@usmba.ac.ma"
                className={`flex items-center gap-4 transition-all duration-300 hover:translate-x-2 group ${
                  drakeMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${drakeMode ? 'bg-white/5' : 'bg-violet-50'}`}>
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base break-all">radouane.elasri@usmba.ac.ma</span>
              </a>
              <a
                href="tel:+212609365349"
                className={`flex items-center gap-4 transition-all duration-300 hover:translate-x-2 group ${
                  drakeMode ? 'text-gray-400 hover:text-violet-400' : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${drakeMode ? 'bg-white/5' : 'bg-violet-50'}`}>
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base">+212 609-365349</span>
              </a>
              <div className={`flex items-center gap-4 group ${
                drakeMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <div className={`p-2 rounded-lg ${drakeMode ? 'bg-white/5' : 'bg-violet-50'}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base">{t('footer.location')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
          drakeMode ? 'border-white/5' : 'border-violet-100'
        }`}>
          <p className={`text-sm font-medium ${drakeMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
             <span className={`text-xs uppercase tracking-widest font-bold ${
               drakeMode ? 'text-gray-600' : 'text-gray-400'
             }`}>
               Designed with ❤️ by Radouane
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
