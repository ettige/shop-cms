import { headers } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react';
export const Layout = async (
    { children }:
        { children: React.ReactNode }
) => {
    // Construct the Cookie header
    const cookieHeader = headers()

    const response = await fetch("http://localhost:3000/api/user", {
        headers: {
            "Cookie": cookieHeader.get("Cookie") || "",
        },
    });
    let ea: any[];

    const data = await response.json();
    if (data.stores.length) {
        redirect(`/${data.stores[0].id}`)
    }
    return (
        <div>{children}</div>
    );
}

export default Layout;
