import React from "react"

export default function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {
    console.log(params)
    return (
        { children }
    )
}