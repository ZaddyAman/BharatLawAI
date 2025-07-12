import React, { useState } from 'react'
import {
  User,
  Scale,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Database,
  Gavel,
  Copy,
  Check,
  Shield,
  AlertTriangle
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  source?: 'vector_db' | 'fallback_llm'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  onRegenerate: (messageId: string) => void
  isLoading: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onRegenerate, isLoading }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const handleRegenerate = () => {
    onRegenerate(message.id)
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // 👤 User Message
  if (message.type === 'user') {
    return (
      <div className="flex items-start space-x-6 justify-end animate-slide-in-right">
        <div className="bg-white text-black px-8 py-6 max-w-3xl shadow-lg shadow-white/10 relative overflow-hidden border border-gray-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full animate-elegantShimmer" />
          <p className="whitespace-pre-wrap relative z-10 font-serif leading-relaxed">{message.content}</p>
          <p className="text-gray-500 text-xs mt-4 relative z-10 font-serif">{formatTime(message.timestamp)}</p>
        </div>
        <div className="w-12 h-12 bg-white border-2 border-gray-300 flex items-center justify-center flex-shrink-0 shadow-lg shadow-white/20">
          <Gavel className="w-6 h-6 text-black" />
        </div>
      </div>
    )
  }

  // 🤖 Assistant Message
  return (
    <div className="flex items-start space-x-6 animate-slide-in-left">
      <div className="w-12 h-12 bg-white border-2 border-gray-300 flex items-center justify-center flex-shrink-0 shadow-lg shadow-white/20 relative">
        <Scale className="w-6 h-6 text-black" />
        <div className="absolute inset-0 bg-white blur-lg opacity-30 animate-subtle-pulse" />
      </div>

      <div className="flex-1 space-y-6">
        <div className="card-elegant legal-border">
          {/* Source Badge */}
          {message.source && (
            <div className="flex items-center space-x-3 mb-6">
              {message.source === 'vector_db' ? (
                <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 border border-white/20">
                  <Database className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-serif font-medium">Legal Database</span>
                  <Shield className="w-3 h-3 text-white animate-subtle-pulse" />
                </div>
              ) : (
                <div className="flex items-center space-x-3 bg-yellow-900/40 px-4 py-2 border border-yellow-700">
                  <Gavel className="w-4 h-4 text-yellow-300" />
                  <span className="text-yellow-300 text-sm font-serif font-medium">General AI Legal Knowledge</span>
                  <AlertTriangle className="w-3 h-3 text-yellow-300 animate-subtle-pulse" />
                </div>
              )}
            </div>
          )}

          {/* Assistant Message Content */}
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-gray-100 leading-relaxed font-serif text-lg">
              {message.content}
            </p>
          </div>

          {/* Timestamp */}
          <p className="text-gray-300 text-xs mt-6 font-serif">{formatTime(message.timestamp)}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group border border-gray-700 hover:border-white/30"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="text-white font-serif">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-serif">Copy Response</span>
              </>
            )}
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-gray-700 hover:border-white/30"
          >
            <RotateCcw className={`w-4 h-4 transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
            <span className="font-serif">{isLoading ? 'Regenerating...' : 'Regenerate'}</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group border border-gray-700 hover:border-white/30">
            <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-serif">Helpful</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 group border border-gray-700 hover:border-red-400/30">
            <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-serif">Not Helpful</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage



