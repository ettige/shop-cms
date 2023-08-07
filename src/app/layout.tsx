import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextjs-auth-prisma-daisyui',
  description: 'Nextjs template along with next-auth, prisma, daisyui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-theme="lofi" lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
