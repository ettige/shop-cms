'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
export const SignOut = () => {
    return (
        <button className='text-error' onClick={() => signOut()}>signOut</button>
    )
}
