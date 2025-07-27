import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Engineer Challenge',
  description: 'A modern frontend application for the AI Engineer Challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
        {children}
      </body>
    </html>
  )
} 