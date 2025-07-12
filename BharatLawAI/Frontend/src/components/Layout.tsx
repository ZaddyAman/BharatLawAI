import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Scale, BookOpen, Info, Menu, X, Gavel } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Consultation', href: '/', icon: Scale },
    { name: 'Legal Library', href: '/explorer', icon: BookOpen },
    { name: 'About Firm', href: '/about', icon: Info },
  ]

  const isActive = (path: string) => location.pathname === path

  // Legal pattern background component
  const LegalPattern = () => (
    <div className="legal-pattern" />
  )

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <LegalPattern />
      
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-black/90 backdrop-blur-md border-b border-gray-700 shadow-lg shadow-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 elegant-element">
                  <Scale className="w-7 h-7 text-black" />
                </div>
                <div className="absolute inset-0 bg-white rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-serif">BharatLaw<span className="text-gray-400">AI</span></h1>
                <p className="text-xs text-gray-400 font-light">Legal Excellence & Innovation</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all duration-300 group professional-underline ${
                      isActive(item.href)
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive(item.href) ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 border border-gray-700 hover:border-white/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-gray-700 animate-slide-up">
              <nav className="space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-4 px-4 py-3 text-sm font-medium transition-all duration-300 border-l-4 ${
                        isActive(item.href)
                          ? 'bg-white/10 text-white border-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-gray-500'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Firm Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Scale className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white font-serif">BharatLawAI</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional legal assistance powered by artificial intelligence. 
                Bridging traditional legal expertise with modern technology.
              </p>
            </div>

            {/* Legal Notice */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Legal Notice</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Gavel className="w-4 h-4 text-white" />
                  <p>This platform provides general legal information only</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Gavel className="w-4 h-4 text-white" />
                  <p>Not a substitute for professional legal advice</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Gavel className="w-4 h-4 text-white" />
                  <p>Consult qualified attorneys for specific legal matters</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Gavel className="w-4 h-4 text-white" />
                  <p>Information accuracy not guaranteed</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Professional Standards</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">AI-Powered Legal Research</p>
                  <p className="text-gray-400 text-sm">Educational & Informational Use</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 BharatLawAI. All rights reserved. Educational use only.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="bg-white/10 px-3 py-1 border border-white/20">
                ⚖️ Not Legal Advice
              </span>
              <span className="flex items-center space-x-1">
                <Scale className="w-4 h-4" />
                <span>Powered by AI</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout