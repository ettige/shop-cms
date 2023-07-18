'use client'
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="container">
            <SessionProvider >
                {children}
            </SessionProvider>
        </main>
    )
}
