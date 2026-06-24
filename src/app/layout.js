import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { MotionConfig } from 'framer-motion'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'E-Commerce Platform',
  description: 'Multi-tenant e-commerce platform with Next.js and Supabase',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <MotionConfig reducedMotion="user">
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              },
              success: {
                icon: '✅',
                style: {
                  background: '#065f46',
                  color: '#fff',
                },
              },
              error: {
                icon: '❌',
                style: {
                  background: '#991b1b',
                  color: '#fff',
                },
              },
            }}
          />
        </MotionConfig>
      </body>
    </html>
  )
}