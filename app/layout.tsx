import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FFEProvider } from '@/components/FFEContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FFE Manager',
  description: 'Furniture, Fixtures & Equipment Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FFEProvider>
          {children}
        </FFEProvider>
      </body>
    </html>
  )
}