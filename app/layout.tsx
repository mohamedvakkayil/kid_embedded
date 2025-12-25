import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Robot Builder Pro | Technoplus Creative Labs',
  description: 'Professional robot face builder with AI-powered design tools. Create, customize, and build real robot faces.',
  keywords: 'robot builder, AI design, robotics, custom robots, Technoplus',
  authors: [{ name: 'Technoplus Creative Labs' }],
  openGraph: {
    title: 'Robot Builder Pro',
    description: 'Professional robot face builder platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

