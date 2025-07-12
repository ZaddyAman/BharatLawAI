import React, { useState, useEffect } from 'react'
import { Search, ChevronDown, ChevronRight, BookOpen, MessageSquare, Scale, Gavel, Filter, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Section {
  id: string
  number: string
  title: string
  content: string
}

interface Chapter {
  id: string
  number: string
  title: string
  sections: Section[]
}

interface Act {
  id: string
  title: string
  year: string
  description: string
  chapters: Chapter[]
}

const SectionExplorerPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedActs, setExpandedActs] = useState<Set<string>>(new Set())
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)

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

  // Mock data - In a real app, this would come from an API
  const acts: Act[] = [
    {
      id: 'ipc',
      title: 'Indian Penal Code',
      year: '1860',
      description: 'The principal criminal code of India',
      chapters: [
        {
          id: 'ipc-ch1',
          number: 'I',
          title: 'Introduction',
          sections: [
            {
              id: 'ipc-s1',
              number: '1',
              title: 'Title and extent of operation of the Code',
              content: 'This Act shall be called the Indian Penal Code, and shall extend to the whole of India except the State of Jammu and Kashmir.'
            },
            {
              id: 'ipc-s2',
              number: '2',
              title: 'Punishment of offences committed within India',
              content: 'Every person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within India.'
            }
          ]
        },
        {
          id: 'ipc-ch20',
          number: 'XX',
          title: 'Of Offences Relating to Marriage',
          sections: [
            {
              id: 'ipc-s498a',
              number: '498A',
              title: 'Husband or relative of husband of a woman subjecting her to cruelty',
              content: 'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine.'
            }
          ]
        }
      ]
    },
    {
      id: 'crpc',
      title: 'Code of Criminal Procedure',
      year: '1973',
      description: 'Procedural law for administration of criminal justice',
      chapters: [
        {
          id: 'crpc-ch1',
          number: 'I',
          title: 'Preliminary',
          sections: [
            {
              id: 'crpc-s1',
              number: '1',
              title: 'Short title, extent and commencement',
              content: 'This Act may be called the Code of Criminal Procedure, 1973. It extends to the whole of India except the State of Jammu and Kashmir.'
            }
          ]
        }
      ]
    }
  ]

  const filteredActs = acts.filter(act =>
    act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.chapters.some(chapter =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.sections.some(section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.number.includes(searchTerm)
      )
    )
  )

  const toggleAct = (actId: string) => {
    const newExpanded = new Set(expandedActs)
    if (newExpanded.has(actId)) {
      newExpanded.delete(actId)
    } else {
      newExpanded.add(actId)
    }
    setExpandedActs(newExpanded)
  }

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  const handleAskAI = (section: Section) => {
    const question = `Please explain Section ${section.number}: ${section.title} in detail`
    navigate('/', { state: { question } })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-16 scroll-reveal">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            <span className="professional-text">Legal</span>
            <span className="text-white block">Library</span>
          </h1>
          <div className="h-1 w-48 bg-gradient-to-r from-white to-gray-500 mx-auto mb-8" />
          <div className="legal-quote max-w-4xl mx-auto mb-8">
            <p className="text-gray-200 leading-relaxed font-serif">
              Comprehensive collection of Indian legal statutes, organized by acts, chapters, and sections. 
              Browse through constitutional provisions, criminal law, civil procedures, and regulatory frameworks.
            </p>
          </div>
        </div>
        
        {/* Professional Search */}
        <div className="relative max-w-3xl mx-auto">
          <div className="card-elegant legal-border">
            <div className="flex items-center space-x-4">
              <Search className="text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search legal acts, chapters, sections, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none font-serif text-lg"
              />
              <Filter className="text-gray-400 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Legal Acts Navigation */}
        <div className="space-y-8 scroll-reveal">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-white font-serif">Legal Acts & Statutes</h2>
          </div>
          
          {filteredActs.map((act, actIndex) => (
            <div key={act.id} className="card-elegant legal-border" style={{ animationDelay: `${actIndex * 0.1}s` }}>
              <button
                onClick={() => toggleAct(act.id)}
                className="w-full flex items-center justify-between text-left group"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-white group-hover:text-gray-300 transition-colors duration-300 text-xl font-serif">
                    {act.title} ({act.year})
                  </h3>
                  <p className="text-gray-300 mt-2 font-serif">{act.description}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 border border-white/20 font-serif">
                      {act.chapters.length} Chapters
                    </span>
                    <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 border border-white/20 font-serif">
                      {act.chapters.reduce((total, chapter) => total + chapter.sections.length, 0)} Sections
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  {expandedActs.has(act.id) ? (
                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-all duration-300" />
                  )}
                </div>
              </button>
              
              {expandedActs.has(act.id) && (
                <div className="mt-8 space-y-6 animate-slide-up">
                  {act.chapters.map((chapter, chapterIndex) => (
                    <div key={chapter.id} className="ml-6 border-l-2 border-gray-700 pl-6">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center justify-between text-left p-4 hover:bg-white/5 transition-all duration-300 group border border-gray-700 hover:border-white/30"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 font-serif">
                            Chapter {chapter.number}: {chapter.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 font-serif">{chapter.sections.length} sections</p>
                        </div>
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300" />
                        )}
                      </button>
                      
                      {expandedChapters.has(chapter.id) && (
                        <div className="mt-4 ml-6 space-y-3 animate-slide-up">
                          {chapter.sections.map((section, sectionIndex) => (
                            <button
                              key={section.id}
                              onClick={() => setSelectedSection(section)}
                              className={`w-full text-left p-4 transition-all duration-300 group border ${selectedSection?.id === section.id ? 'bg-white/10 border-white' : 'border-gray-700 hover:bg-white/5 hover:border-white/30'}`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <Scale className="w-5 h-5 text-black" />
                                </div>
                                <div className="flex-1">
                                  <span className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-300 font-serif">
                    Section {section.number}
                  </span>
                  <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300 font-serif">
                    {section.title}
                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Section Details */}
        <div className="lg:sticky lg:top-8 scroll-reveal">
          {selectedSection ? (
            <div className="card-elegant legal-border">
              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-3 font-serif">
                    Section {selectedSection.number}
                  </h3>
                  <p className="text-gray-400 text-lg font-serif">{selectedSection.title}</p>
                </div>
                <button
                  onClick={() => handleAskAI(selectedSection)}
                  className="btn-primary flex items-center space-x-3 group ml-6"
                >
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-serif">Consult AI</span>
                  <Gavel className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </button>
              </div>
              
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-4 font-serif">Legal Text</h4>
                <div className="p-6 bg-white/5 border border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-elegantShimmer" />
                  <p className="text-gray-200 leading-relaxed font-serif relative z-10">{selectedSection.content}</p>
                </div>
              </div>
              
              <div className="bg-gray-900/50 border border-white/20 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-elegantShimmer" />
                <div className="flex items-start space-x-4 relative z-10">
                  <FileText className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-2 font-serif">Legal Disclaimer</h4>
                    <p className="text-sm text-gray-300 font-serif">
                      This is a simplified version for educational purposes. Please refer to the official 
                      legal text and consult qualified legal professionals for complete and accurate 
                      interpretation of the law.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-elegant text-center legal-border">
              <div className="w-20 h-20 bg-white mx-auto mb-8 flex items-center justify-center elegant-element">
                <BookOpen className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 font-serif">Select a Legal Section</h3>
              <p className="text-gray-300 leading-relaxed font-serif mb-8">
                Choose a section from the legal acts on the left to view its complete text, 
                interpretation, and related legal provisions.
              </p>
              <div className="flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-white to-gray-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SectionExplorerPage