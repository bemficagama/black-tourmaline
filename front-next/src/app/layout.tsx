import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalContextProvider } from './Context/store'

import NextAuthSessionProvider from './providers/sessionProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_BR">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <GlobalContextProvider>
            {children}
          </GlobalContextProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
