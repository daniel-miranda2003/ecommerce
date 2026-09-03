"use client"

import { useEffect, useState } from "react"

export default function StickyNavWrapper({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 group/header ${isScrolled ? "is-scrolled" : ""}`}>
      {children}
    </div>
  )
}
