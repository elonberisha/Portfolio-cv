/* Root layout — uses Payload's RootLayout as the single <html>/<body> provider.
 * Fonts are loaded via next/font and injected as CSS variables via htmlProps.className */
import type { ServerFunctionClient } from 'payload'

import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import React from 'react'

import PayloadStyles from './PayloadStyles'
import { importMap } from './(payload)/admin/[[...segments]]/importMap'

// Serif — Fraunces (expressive, editorial)
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
})

// Sans — Plus Jakarta Sans (warm, modern, versatile)
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Mono — JetBrains Mono (for code/subdomain snippets)
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
})

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  const { default: payloadConfig } = await import('@payload-config')
  return (args as { payload?: unknown }).payload || (await (await import('payload')).getPayload({ config: payloadConfig }))
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
    htmlProps={{
      className: `${fraunces.variable} ${jakarta.variable} ${jetbrains.variable}`,
    }}
  >
    <PayloadStyles />
    {children}
  </RootLayout>
)

export default Layout
