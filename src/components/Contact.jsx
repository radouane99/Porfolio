import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, User, ArrowRight, Heart, Code, Coffee, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import logoLight from "../assets/img/1.png";
import logoDark from "../assets/img/2.png";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import Footer from './Footer';


const Contact = () => {
  const { isDarkMode: drakeMode } = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Read the key from Vite env (must start with VITE_)
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  // Submit to Web3Forms using the VITE_WEB3FORMS_KEY environment variable
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    if (!WEB3FORMS_KEY) {
      setResult(t('contact.missing_key'));
      setIsSubmitting(false);
      return;
    }

    try {
      const form = new FormData(e.target);
      form.append("access_key", WEB3FORMS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });
      const data = await response.json();

      if (data?.success) {
        setResult(t('contact.success'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult(data?.message || t('contact.error'));
      }
    } catch (err) {
      setResult(t('contact.network_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('contact.email_label'),
      value: "radouane.elasri@usmba.ac.ma",
      link: "mailto:radouane.elasri@usmba.ac.ma"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('contact.phone_label'),
      value: "+212 609365349",
      link: "tel:+212609365349"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('contact.location_label'),
      value: t('contact.location_val'),
      link: "#"
    }
  ];

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
    { name: t('portfolio.title'), href: "#projects" },
    { name: t('nav.contact'), href: "#contact" }
  ];

  return (
    <div className="relative">
      <div id="contact" className={`min-h-screen py-20 px-4 sm:px-6 font-sans antialiased`}
        style={drakeMode ? {
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 60%), #08080f'
        } : {
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 60%), #f8f7ff'
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="reveal">
            <div className="section-tag mb-6">
              {t('contact.get_in_touch')}
            </div>

            <h2 className={`font-head font-bold text-4xl md:text-5xl mb-6 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
              {t('contact.work_together')}
            </h2>

            <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed ${drakeMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('contact.subtitle')}
            </p>
          </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${drakeMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  <MessageCircle className="w-6 h-6 text-cyan-500" />
                  {t('contact.lets_connect')}
                </h3>
                <p className={`text-lg leading-relaxed mb-8 ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {t('contact.interest_opportunities')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className={`cursor-target group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 card-hover ${drakeMode
                      ? 'bg-white/4 border-white/8 card-hover-dark'
                      : 'bg-white border-violet-100 card-hover-light'
                      }`}
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${drakeMode
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'bg-violet-500/10 text-violet-600'
                      }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${drakeMode ? 'text-violet-400' : 'text-violet-600'}`}>
                        {item.label}
                      </div>
                      <div className={`font-medium ${drakeMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {item.value}
                      </div>
                    </div>
                    <svg className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${drakeMode ? 'text-violet-400' : 'text-violet-500'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Availability Status */}
                <div className={`p-6 rounded-2xl border ${drakeMode
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-emerald-50 border-emerald-200'
                  }`}>
                  <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-3 h-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </div>
                  <span className={`font-semibold ${drakeMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {t('contact.available_projects')}
                  </span>
                </div>
                <p className={`text-sm ${drakeMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                  {t('contact.currently_accepting')}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`cursor-target p-8 rounded-3xl border-2 transition-all duration-500 card-hover ${drakeMode
              ? 'glass border-violet-500/30 card-hover-dark'
              : 'bg-white border-violet-200 card-hover-light'
              }`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-semibold ${drakeMode ? 'text-violet-400' : 'text-violet-600'}`}>
                    <User className="w-4 h-4" />
                    {t('form.full_name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.01] ${drakeMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-400'
                      : 'bg-white border-violet-200 text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:shadow-lg focus:shadow-violet-500/10'
                      }`}
                    placeholder={t('form.placeholder_name')}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-semibold ${drakeMode ? 'text-violet-400' : 'text-violet-600'}`}>
                    <Mail className="w-4 h-4" />
                    {t('form.email_address')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.01] ${drakeMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-400'
                      : 'bg-white border-violet-200 text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:shadow-lg'
                      }`}
                    placeholder={t('form.placeholder_email')}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-semibold ${drakeMode ? 'text-violet-400' : 'text-violet-600'}`}>
                    <MessageCircle className="w-4 h-4" />
                    {t('form.your_message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:scale-[1.01] resize-none ${drakeMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-violet-400'
                      : 'bg-white border-violet-200 text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:shadow-lg'
                      }`}
                    placeholder={t('form.placeholder_message')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                    bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-violet-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.send_message')}
                    </>
                  )}
                </button>

                {/* API result message */}
                {result && (
                  <p className={`text-center mt-2 text-sm ${result.toLowerCase().includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                    {result}
                  </p>
                )}

                {/* Privacy Note */}
                <p className={`text-center text-xs ${drakeMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  {t('contact.privacy')}
                </p>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mt-16">
            <p className={`text-lg mb-6 ${drakeMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {t('contact.prefer_social')}
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`cursor-target flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${drakeMode
                    ? 'bg-[#050A30] text-gray-300 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    } ${social.color}`}
                >
                  {social.icon}
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;