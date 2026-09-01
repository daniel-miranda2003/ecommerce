"use client"

import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  index?: number
  className?: string
  disable?: boolean
}

const Reveal = ({
  children,
  index = 0,
  className = "",
  disable = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (disable || !ref.current) {
      setIsVisible(true)
      return
    }

    const el = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    )

    observer.observe(el)

    return () => observer.unobserve(el)
  }, [disable])

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-index": index } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export default Reveal