'use client'

import { useState } from 'react'
import { 
  Rocket, 
  Code, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Built with Next.js for optimal performance and speed.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Modern Tech Stack',
      description: 'TypeScript, Tailwind CSS, and React for robust development.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'Dynamic content that updates in real-time for the best user experience.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure by Design',
      description: 'Built with security best practices and modern authentication.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Friendly',
      description: 'Intuitive interface designed with modern UX principles.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900">AI Challenge</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-secondary-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="/chat" className="text-secondary-600 hover:text-primary-600 transition-colors">Chat</a>
              <a href="#about" className="text-secondary-600 hover:text-primary-600 transition-colors">About</a>
              <a href="/chat" className="btn-primary">Try Chat</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              AI Engineer Challenge 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Welcome to the Future of
              <span className="text-primary-600 block">AI Development</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              Experience a modern, professional frontend application built with cutting-edge technologies. 
              This is your gateway to the next generation of web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/chat" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
                Try AI Chat
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a href="#features" className="btn-secondary text-lg px-8 py-3 inline-flex items-center">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Built with modern technologies and best practices for an exceptional user experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get the latest updates and features delivered to your inbox.
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field flex-1"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-white">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Thanks for subscribing!</span>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI Challenge</span>
              </div>
              <p className="text-secondary-300">
                Building the future of AI-powered applications with modern web technologies.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-300">
            <p>&copy; 2024 AI Engineer Challenge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 