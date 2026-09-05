"use client"

import React from "react"
import { useI18n } from "@lib/i18n/provider"

const FloatingWhatsapp = () => {
  const { t } = useI18n()

  return (
    <a
      href="https://wa.me/5511999999999" // Replace with actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform duration-300 hover:scale-110 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
      </svg>
    </a>
  )
}

export default FloatingWhatsapp
