'use client'
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
export default function AccountLayout({
    children,
    session,
}: {
    session: Session,
    children: React.ReactNode
}) {
    return (
        <main className="container">
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </main>
    )
}
