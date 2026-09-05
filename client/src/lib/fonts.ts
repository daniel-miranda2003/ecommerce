import { Archivo, Cormorant_Garamond } from "next/font/google"
import localFont from "next/font/local"

export const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

export const cursive = localFont({
  src: "../app/fonts/alex-brush-regular.woff2",
  variable: "--font-cursive",
  display: "swap",
})