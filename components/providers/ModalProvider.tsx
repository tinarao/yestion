"use client"

import { useEffect, useState } from "react"
import SettingsModal from "@/components/modals/SettingsModal"

const ModalProvider = () => {

    const [mounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!mounted) return null;

  return (
    <>
        <SettingsModal />
    </>
  )
}

export default ModalProvider