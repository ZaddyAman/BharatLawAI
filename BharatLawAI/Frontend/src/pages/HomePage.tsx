import React, { useState, useEffect, useRef } from 'react'
import { Send, Loader2, Scale, BookOpen, MessageCircle, Gavel, Users, Shield } from 'lucide-react'
import ChatMessage from '../components/ChatMessage'
import { chatWithAI } from '../utils/api'
import TextareaAutosize from 'react-textarea-autosize'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  source?: 'vector_db' | 'fallback_llm'
  timestamp: Date
}

const HomePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [regeneratingMessageId, setRegeneratingMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    console.log('Adding user message:', userMessage)

    // Add user message immediately and clear input
    setMessages(prev => {
      const newMessages = [...prev, userMessage]
      console.log('Updated messages after user input:', newMessages)
      return newMessages
    })
    
    setInputValue('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      console.log('Sending request to API:', userMessage.content)
      const response = await chatWithAI(userMessage.content)
      console.log('Received response:', response)
      
      // Add assistant response after a brief delay for better UX
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: response.answer,
          source: response.source,
          timestamp: new Date()
        }

        console.log('Adding assistant message:', assistantMessage)
        
        setMessages(prev => {
          const newMessages = [...prev, assistantMessage]
          console.log('Updated messages after assistant response:', newMessages)
          return newMessages
        })
        
        setIsTyping(false)
        setIsLoading(false)
      }, 800)
      
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `I apologize, but I encountered an error while processing your legal inquiry. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure your backend is running on http://127.0.0.1:8000 and try again.`,
          timestamp: new Date()
        }
        
        console.log('Adding error message:', errorMessage)
        
        setMessages(prev => {
          const newMessages = [...prev, errorMessage]
          console.log('Updated messages after error:', newMessages)
          return newMessages
        })
        
        setIsTyping(false)
        setIsLoading(false)
      }, 800)
    }
  }

  const handleRegenerateResponse = async (messageId: string) => {
    console.log('Regenerating response for message ID:', messageId)
    
    // Find the assistant message and the user message before it
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex === -1) {
      console.error('Message not found for regeneration:', messageId)
      return
    }

    const assistantMessage = messages[messageIndex]
    if (assistantMessage.type !== 'assistant') {
      console.error('Can only regenerate assistant messages')
      return
    }

    // Find the corresponding user message (should be the previous message)
    const userMessage = messages[messageIndex - 1]
    if (!userMessage || userMessage.type !== 'user') {
      console.error('Could not find corresponding user message for regeneration')
      return
    }

    console.log('Found user message for regeneration:', userMessage.content)

    // Set loading state for this specific message
    setRegeneratingMessageId(messageId)
    setIsLoading(true)

    try {
      console.log('Regenerating response for question:', userMessage.content)
      const response = await chatWithAI(userMessage.content)
      console.log('Received regenerated response:', response)
      
      // Update the assistant message with new content
      const updatedMessage: Message = {
        ...assistantMessage,
        content: response.answer,
        source: response.source,
        timestamp: new Date()
      }

      console.log('Updating message with regenerated content:', updatedMessage)

      setMessages(prev => {
        const newMessages = prev.map(msg => 
          msg.id === messageId ? updatedMessage : msg
        )
        console.log('Updated messages after regeneration:', newMessages)
        return newMessages
      })

    } catch (error) {
      console.error('Error regenerating response:', error)
      
      // Update with error message
      const errorMessage: Message = {
        ...assistantMessage,
        content: `I apologize, but I encountered an error while regenerating the response. Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date()
      }

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? errorMessage : msg
      ))
    } finally {
      setIsLoading(false)
      setRegeneratingMessageId(null)
    }
  }

  const exampleQuestions = [
    "What constitutes Section 498A of the Indian Penal Code?",
    "Explain the procedure for filing a First Information Report",
    "What are the legal grounds for divorce under Hindu Marriage Act?",
    "How does one register intellectual property in India?"
  ]

  const legalServices = [
    {
      icon: Scale,
      title: "Constitutional Law",
      description: "Fundamental rights, constitutional interpretation, and judicial review",
      cases: "2,847 cases"
    },
    {
      icon: Gavel,
      title: "Criminal Law",
      description: "IPC, CrPC, evidence law, and criminal procedure",
      cases: "4,521 cases"
    },
    {
      icon: Users,
      title: "Civil Litigation",
      description: "Contract disputes, property law, and civil procedures",
      cases: "3,692 cases"
    },
    {
      icon: Shield,
      title: "Corporate Law",
      description: "Company law, securities regulation, and compliance",
      cases: "1,834 cases"
    }
  ]

  console.log('Current messages state:', messages)
  console.log('Messages length:', messages.length)
  console.log('Is loading:', isLoading)
  console.log('Is typing:', isTyping)
  console.log('Regenerating message ID:', regeneratingMessageId)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Hero Section - Only show when no messages */}
      {messages.length === 0 && (
        <div ref={heroRef} className="text-center mb-20 scroll-reveal">
          {/* Professional Logo */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-white rounded-full animate-professional-glow elegant-element" />
              <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-gray-300">
                <Scale className="w-16 h-16 text-black" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-black border border-white px-4 py-1 rounded-md">
                  <span className="text-white text-sm font-serif">Est. 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-up font-serif">
              <span className="professional-text">Legal</span>
              <br />
              <span className="text-white">Consultation</span>
            </h1>
            <div className="h-1 w-48 bg-gradient-to-r from-white to-gray-500 mx-auto mb-8" />
            <div className="legal-quote max-w-4xl mx-auto mb-8">
              <p className="text-xl text-gray-200 leading-relaxed font-serif">
                Professional legal assistance powered by artificial intelligence. 
                Specializing in Indian constitutional law, criminal procedure, 
                civil litigation, and corporate compliance.
              </p>
            </div>
          </div>

          {/* Legal Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 scroll-reveal">
            {legalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index} 
                  className="card-elegant group hover:scale-105 transition-all duration-500 legal-border text-center"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 bg-white mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg font-serif">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="text-xs text-gray-400 bg-white/5 px-3 py-1 inline-block border border-gray-700">
                    {service.cases}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Example Legal Questions */}
          <div className="mb-16 scroll-reveal">
            <h2 className="text-3xl font-bold text-white mb-8 font-serif">Common Legal Inquiries</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="group p-8 text-left card-elegant hover:scale-105 transition-all duration-500 legal-border"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-gray-200 group-hover:text-white transition-colors duration-300 leading-relaxed">
                        "{question}"
                      </p>
                      <div className="mt-4 text-xs text-gray-400">
                        Click to ask this question
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Professional Notice */}
          <div className="bg-gray-900/50 border-2 border-white/20 p-8 max-w-4xl mx-auto scroll-reveal">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white mb-3 text-lg font-serif">Professional Disclaimer</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  This AI-powered platform provides general legal information for educational purposes only. 
                  It does not constitute legal advice, create an attorney-client relationship, or substitute 
                  for consultation with qualified legal professionals. Always consult licensed attorneys 
                  for specific legal matters and representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Container */}
      {messages.length > 0 && (
        <div className="mb-12">
          <div className="space-y-12">
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className="opacity-100 transform translate-y-0 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ChatMessage
                  message={message}
                  onRegenerate={handleRegenerateResponse}
                  isLoading={isLoading && regeneratingMessageId === message.id}
                />
              </div>
            ))}
            
            {/* Professional Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-6 opacity-100 transform translate-y-0 transition-all duration-500">
                <div className="w-12 h-12 bg-white flex items-center justify-center flex-shrink-0">
                  <Scale className="w-6 h-6 text-black" />
                </div>
                <div className="card-elegant flex-1">
                  <div className="flex items-center space-x-4 text-gray-400 mb-4">
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span className="font-serif">Analyzing legal precedents...</span>
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Professional Input Form */}
      <div className="sticky bottom-0 bg-black/90 backdrop-blur-sm pt-8">
        <form onSubmit={handleSubmit} className="card-elegant legal-border">
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="block text-white font-serif mb-3">Legal Inquiry</label>
              <TextareaAutosize
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your legal question or concern in detail..."
                className="input-field resize-none min-h-[100px] text-white placeholder-gray-500 font-serif"
                minRows={4}
                maxRows={10}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
            </div>
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="btn-primary h-fit flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading && !regeneratingMessageId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                )}
                <span className="font-serif">Submit Inquiry</span>
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-sm border-t border-gray-700 pt-6">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-400">
                <BookOpen className="w-4 h-4 text-white" />
                <span className="font-serif">Legal Database</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Scale className="w-4 h-4 text-white" />
                <span className="font-serif">AI Analysis</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-serif">Press Enter to submit • Shift+Enter for new line</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HomePage