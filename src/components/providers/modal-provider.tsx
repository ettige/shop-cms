'use client'

import React, { useEffect, useState } from 'react'
import { StoreModal } from '../modals/store-modal'
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    else {
        return (
            <>
                <StoreModal />
            </>
        )
    }
}
