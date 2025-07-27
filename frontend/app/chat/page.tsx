'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Settings, Key } from 'lucide-react'
import { ApiService } from '@/lib/api'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !apiKey.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setStreamingMessage('')

    try {
      await ApiService.streamChatMessage(
        {
          developer_message: "You are a helpful AI assistant. Provide clear, concise, and accurate responses.",
          user_message: inputMessage,
          model: "gpt-4.1-mini",
          api_key: apiKey
        },
        (chunk) => {
          setStreamingMessage(prev => prev + chunk)
        },
        (fullResponse) => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: fullResponse,
            role: 'assistant',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, assistantMessage])
          setStreamingMessage('')
        },
        (error) => {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: `Sorry, I encountered an error: ${error}. Please check your API key and try again.`,
            role: 'assistant',
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
        }
      )
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please check your API key and try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-primary-600" />
              <h1 className="text-xl font-bold text-secondary-900">AI Chat Assistant</h1>
            </div>
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="flex items-center space-x-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* API Key Input */}
      {showApiKeyInput && (
        <div className="bg-white border-b border-secondary-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <Key className="w-5 h-5 text-secondary-600" />
              <input
                type="password"
                placeholder="Enter your OpenAI API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-field flex-1"
              />
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="btn-secondary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-secondary-500 py-12">
                <Bot className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
                <h3 className="text-lg font-medium mb-2">Welcome to AI Chat!</h3>
                <p className="text-sm">Enter your OpenAI API key in settings and start chatting.</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-primary-200' : 'text-secondary-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <User className="w-5 h-5 text-primary-200 mt-0.5 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming Message */}
            {isLoading && streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-secondary-100 text-secondary-900">
                  <div className="flex items-start space-x-2">
                    <Bot className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{streamingMessage}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                        <span className="text-xs text-secondary-500">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-secondary-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading || !apiKey.trim()}
                className="input-field flex-1"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim() || !apiKey.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
            {!apiKey.trim() && (
              <p className="text-sm text-secondary-500 mt-2">
                Please enter your OpenAI API key in settings to start chatting.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 