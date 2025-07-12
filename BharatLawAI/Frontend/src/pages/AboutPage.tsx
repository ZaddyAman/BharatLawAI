import React, { useEffect } from 'react'
import { Scale, Database, Gavel, Code, Shield, BookOpen, Users, Award, Briefcase, Globe, Lock, Building } from 'lucide-react'

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    const scrollElements = document.querySelectorAll('.scroll-reveal')
    scrollElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const practiceAreas = [
    {
      icon: Scale,
      title: 'Constitutional Law',
      description: 'Fundamental rights interpretation, constitutional challenges, and judicial review proceedings.',
      experience: '15+ Years'
    },
    {
      icon: Gavel,
      title: 'Criminal Defense',
      description: 'Comprehensive criminal law practice including IPC, CrPC, and evidence law representation.',
      experience: '12+ Years'
    },
    {
      icon: Briefcase,
      title: 'Corporate Law',
      description: 'Business formation, compliance, mergers & acquisitions, and corporate governance.',
      experience: '10+ Years'
    },
    {
      icon: Building,
      title: 'Civil Litigation',
      description: 'Contract disputes, property law, tort claims, and comprehensive civil representation.',
      experience: '18+ Years'
    }
  ]

  const firmValues = [
    { name: 'Professional Excellence', description: 'Maintaining highest standards of legal practice', icon: Award },
    { name: 'Client Confidentiality', description: 'Absolute protection of attorney-client privilege', icon: Lock },
    { name: 'Ethical Practice', description: 'Unwavering commitment to legal ethics and integrity', icon: Shield },
    { name: 'Innovation', description: 'Leveraging technology to enhance legal services', icon: Code },
    { name: 'Accessibility', description: 'Making legal knowledge available to all', icon: Globe }
  ]

  const credentials = [
    { name: 'Supreme Court of India', description: 'Licensed to practice before the highest court', icon: Scale },
    { name: 'High Court Practice', description: 'Extensive experience in state high courts', icon: BookOpen },
    { name: 'Bar Council Registration', description: 'Registered with Bar Council of India', icon: Shield },
    { name: 'Legal Technology', description: 'Certified in legal research and AI applications', icon: Database }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20 scroll-reveal">
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 bg-white animate-professional-glow elegant-element" />
            <div className="relative w-full h-full bg-white flex items-center justify-center border-4 border-gray-300">
              <Scale className="w-16 h-16 text-black" />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-black border border-white px-6 py-2">
                <span className="text-white text-sm font-serif">Legal Excellence</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-8 font-serif">
          <span className="professional-text">About Our</span>
          <span className="text-white block">Legal Practice</span>
        </h1>
        <div className="h-1 w-48 bg-gradient-to-r from-white to-gray-500 mx-auto mb-8" />
        <div className="legal-quote max-w-4xl mx-auto">
          <p className="text-xl text-gray-300 leading-relaxed font-serif">
            Established to bridge traditional legal expertise with modern artificial intelligence, 
            our practice represents the evolution of legal services in the digital age.
          </p>
        </div>
      </div>

      {/* Firm Mission */}
      <div className="card-elegant mb-20 scroll-reveal legal-border">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 font-serif flex items-center">
              <Award className="w-10 h-10 text-white mr-4" />
              Our Mission
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed font-serif">
              <p className="text-lg">
                To democratize access to legal knowledge and provide professional-grade legal assistance 
                through the innovative application of artificial intelligence technology.
              </p>
              <p>
                We believe that understanding the law should not be limited to legal professionals. 
                Our AI-powered platform serves as a bridge between complex legal concepts and 
                practical understanding for individuals, businesses, and legal practitioners.
              </p>
              <p>
                By combining traditional legal scholarship with cutting-edge technology, we aim to 
                make legal information more accessible, accurate, and actionable for all members of society.
              </p>
            </div>
          </div>
          <div className="bg-white/5 p-8 border border-white/20">
            <div className="text-center">
              <div className="w-20 h-20 bg-white mx-auto mb-6 flex items-center justify-center">
                <Users className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-serif">Serving Justice</h3>
              <p className="text-gray-400 font-serif">
                Committed to upholding the principles of justice, equality, and the rule of law 
                through innovative legal technology solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Areas */}
      <div className="mb-20 scroll-reveal">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-serif">Areas of Practice</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {practiceAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div 
                key={index} 
                className="card-elegant group hover:scale-105 transition-all duration-500 legal-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-white flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-white text-xl font-serif">{area.title}</h3>
                      <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 border border-white/20 font-serif">
                        {area.experience}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed font-serif">{area.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Technology & Innovation */}
      <div className="card-elegant mb-20 scroll-reveal legal-border">
        <h2 className="text-4xl font-bold text-white mb-8 font-serif flex items-center">
          <Code className="w-10 h-10 text-white mr-4" />
          Technology & Innovation
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white mx-auto mb-4 flex items-center justify-center">
              <Database className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-white mb-3 font-serif">Legal Database</h3>
            <p className="text-gray-400 text-sm font-serif">
              Comprehensive collection of Indian legal statutes, case law, and regulatory documents
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white mx-auto mb-4 flex items-center justify-center">
              <Gavel className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-white mb-3 font-serif">AI Analysis</h3>
            <p className="text-gray-400 text-sm font-serif">
              Advanced language models trained specifically on Indian legal texts and precedents
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-bold text-white mb-3 font-serif">Secure Platform</h3>
            <p className="text-gray-400 text-sm font-serif">
              Enterprise-grade security ensuring confidentiality and data protection
            </p>
          </div>
        </div>
      </div>

      {/* Professional Credentials */}
      <div className="card-elegant mb-20 scroll-reveal legal-border">
        <h2 className="text-4xl font-bold text-white mb-8 font-serif flex items-center">
          <Shield className="w-10 h-10 text-white mr-4" />
          Professional Credentials
        </h2>
        <div className="space-y-6">
          {credentials.map((credential, index) => {
            const Icon = credential.icon
            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-6 bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white font-serif">{credential.name}</h3>
                    <p className="text-gray-400 text-sm font-serif">{credential.description}</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-white animate-subtle-pulse" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Firm Values */}
      <div className="card-elegant mb-20 scroll-reveal legal-border">
        <h2 className="text-4xl font-bold text-white mb-8 font-serif flex items-center">
          <Scale className="w-10 h-10 text-white mr-4" />
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firmValues.map((value, index) => {
            const Icon = value.icon
            return (
              <div 
                key={index} 
                className="text-center p-6 bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-white mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-bold text-white mb-2 font-serif">{value.name}</h3>
                <p className="text-gray-400 text-sm font-serif">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Professional Disclaimer */}
      <div className="bg-gray-900/50 border-2 border-white/20 p-8 mb-20 scroll-reveal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-elegantShimmer" />
        <div className="flex items-start space-x-6 relative z-10">
          <div className="w-16 h-16 bg-white flex items-center justify-center flex-shrink-0">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 text-2xl font-serif">Professional Disclaimer</h3>
            <div className="text-gray-300 space-y-4 leading-relaxed font-serif">
              <p>
                <strong className="text-white">Attorney-Client Relationship:</strong> Use of this AI platform does not 
                create an attorney-client relationship. All interactions are for informational purposes only.
              </p>
              <p>
                <strong className="text-white">Legal Advice:</strong> This platform provides general legal information 
                and should not be construed as legal advice. Always consult qualified legal professionals for specific matters.
              </p>
              <p>
                <strong className="text-white">Accuracy:</strong> While we strive for accuracy, legal information may 
                change, and AI responses may not reflect the most current legal developments or interpretations.
              </p>
              <p>
                <strong className="text-white">Confidentiality:</strong> Do not share confidential or sensitive 
                information through this platform. For confidential matters, contact licensed attorneys directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card-elegant text-center scroll-reveal legal-border">
        <div className="w-20 h-20 bg-white mx-auto mb-8 flex items-center justify-center">
          <Users className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-6 font-serif">Professional Consultation</h2>
        <p className="text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed font-serif">
          For matters requiring personal legal representation or confidential consultation, 
          we recommend engaging qualified legal professionals in your jurisdiction.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="btn-primary group font-serif">
            <Code className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
            View Source Code
          </button>
          <button className="btn-secondary group font-serif">
            <Shield className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            Report Issue
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage