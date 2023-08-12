import './globals.css'
import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import AuthProvider from '@/components/providers/auth-provider'

const vazirmatn = Vazirmatn({ subsets: ['arabic'] })

export const metadata: Metadata = {
  title: "ShipShop",
  description: "Ship Shop ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html dir='rtl' lang="fa">
      <body className={vazirmatn.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
