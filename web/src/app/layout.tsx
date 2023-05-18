import React from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJAmjuree,
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJAmjuree = BaiJAmjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'Cápsula do tempo',
  description: 'Uma cápsula do tempo construída na NLW spacetime.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJAmjuree.variable}bg-pink-600 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
