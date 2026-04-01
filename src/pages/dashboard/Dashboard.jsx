import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Award, FolderKanban, Code, User, Calendar, Mail } from 'lucide-react'

import { getProjects } from '../../services/projectsService'
import { getCertificates } from '../../services/certificatesService'
import { getTechnologies } from '../../services/technologiesService'

function Dashboard() {
  const { user } = useAuth()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const [projectsCount, setProjectsCount] = useState(0)
  const [certificatesCount, setCertificatesCount] = useState(0)
  const [technologiesCount, setTechnologiesCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCounts()
  }, [])

  const loadCounts = async () => {
    setLoading(true)
    const [projectsResult, certificatesResult, technologiesResult] = await Promise.all([
      getProjects(),
      getCertificates(),
      getTechnologies(),
    ])

    if (projectsResult.data) {
      setProjectsCount(projectsResult.data.length)
    }
    if (certificatesResult.data) {
      setCertificatesCount(certificatesResult.data.length)
    }
    if (technologiesResult.data) {
      setTechnologiesCount(technologiesResult.data.length)
    }
    setLoading(false)
  }

  const stats = [
    {
      label: 'Projects',
      value: loading ? '...' : projectsCount.toString(),
      icon: FolderKanban,
      color: 'from-violet-600 to-cyan-500',
      onClick: () => navigate('/dashboard/projects'),
    },
    {
      label: 'Technologies',
      value: loading ? '...' : technologiesCount.toString(),
      icon: Code,
      color: 'from-violet-500 to-pink-500',
      onClick: () => navigate('/dashboard/technologies'),
    },
    {
      label: 'Certificates',
      value: loading ? '...' : certificatesCount.toString(),
      icon: Award,
      color: 'from-cyan-500 to-violet-500',
      onClick: () => navigate('/dashboard/certificates'),
    },
  ]

  return (
    <div className="relative min-h-full">

      <div className="p-6 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className={`w-12 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-violet-500' : 'from-violet-500 to-cyan-500'}`}></div>
              <span className={`text-sm font-semibold tracking-widest uppercase ${isDarkMode ? 'text-cyan-400' : 'text-violet-600'}`}>
                Overview
              </span>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${isDarkMode ? 'from-violet-500 to-cyan-400' : 'from-cyan-500 to-violet-500'}`}></div>
            </div>
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back!
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-violet-300' : 'text-gray-700'}`}>
              Here's an overview of your dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <button
                  key={stat.label}
                  onClick={stat.onClick}
                  className={`cursor-target group relative backdrop-blur-xl rounded-3xl border p-6 transition-all duration-500 transform hover:-translate-y-2 text-left ${isDarkMode
                      ? 'bg-white/5 border-white/10 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10'
                      : 'bg-white/80 border-slate-200 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/5'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-violet-600'}`}>
                        {stat.label}
                      </p>
                      <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* User Information Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`backdrop-blur-xl rounded-3xl border p-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-slate-200'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  User Information
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-violet-600'}`} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-cyan-400' : 'text-violet-600'}`}>Email</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.email || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-violet-600'}`} />
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-cyan-400' : 'text-violet-600'}`}>Last Sign In</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-xl rounded-3xl border p-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-slate-200'
              }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quick Navigation
                </h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/dashboard/projects')}
                  className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group hover:scale-105 ${isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-violet-500/50 text-white'
                      : 'bg-white hover:bg-violet-50 border-slate-200 hover:border-violet-300 text-gray-900'
                    }`}
                >
                  <FolderKanban className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-violet-400' : 'text-violet-600'
                    }`} />
                  <span className="font-medium">View Projects</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard/technologies')}
                  className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group hover:scale-105 ${isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-violet-500/50 text-white'
                      : 'bg-white hover:bg-violet-50 border-slate-200 hover:border-violet-300 text-gray-900'
                    }`}
                >
                  <Code className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-violet-400' : 'text-violet-600'
                    }`} />
                  <span className="font-medium">View Technologies</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard/certificates')}
                  className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group hover:scale-105 ${isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-violet-500/50 text-white'
                      : 'bg-white hover:bg-violet-50 border-slate-200 hover:border-violet-300 text-gray-900'
                    }`}
                >
                  <Award className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-violet-400' : 'text-violet-600'
                    }`} />
                  <span className="font-medium">View Certificates</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className={`cursor-target w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group hover:scale-105 ${isDarkMode
                      ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 hover:from-violet-500/30 hover:to-pink-500/30 border-violet-400/30 hover:border-violet-400/50 text-violet-400'
                      : 'bg-gradient-to-r from-violet-500/10 to-pink-500/10 hover:from-violet-500/20 hover:to-pink-500/20 border-violet-300/50 hover:border-violet-400 text-violet-700'
                    }`}
                >
                  <span className="font-medium">Go to Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard