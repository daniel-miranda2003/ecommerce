"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useI18n } from "@lib/i18n/provider"

const SLIDES = [
  {
    id: 1,
    title: "conjunto Maitê",
    image: "/hero-bg.png",
    link: "/store?category=conjuntos",
  },
  {
    id: 2,
    title: "vestido Flora",
    image: "/launch-1.png",
    link: "/store?category=vestidos",
  },
  {
    id: 3,
    title: "macacão Terra",
    image: "/launch-2.png",
    link: "/store?category=macacoes",
  },
]

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useI18n()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative w-full overflow-hidden h-[80svh]">
      <div
        className="relative h-full w-full flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex-none w-full min-w-full h-full flex items-center justify-center overflow-hidden"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col items-center text-center px-4 animate-reveal w-full max-w-5xl mx-auto">
              <h2 className="font-cursive text-[4rem] small:text-[7rem] text-white leading-none tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                {slide.title}
              </h2>

              <LocalizedClientLink
                href={slide.link}
                className="mt-8 small:mt-12 group flex items-center justify-center px-12 py-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 transition-all duration-300 active:scale-[0.98]"
              >
                <span className="text-white text-sm small:text-base font-semibold tracking-[0.2em] uppercase">
                  {t("product.buy")}
                </span>
              </LocalizedClientLink>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-4 small:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 small:w-12 small:h-12 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:scale-105 hover:bg-white transition-all duration-200"
        aria-label={t("hero.previous")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 small:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 small:w-12 small:h-12 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:scale-105 hover:bg-white transition-all duration-200"
        aria-label={t("hero.next")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={t("hero.slideAria", { index: idx + 1 })}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel
