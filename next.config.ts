import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Redirect legacy static pages during migration
  async rewrites() {
    return [
      { source: '/Landing.html', destination: '/' },
      { source: '/index.html', destination: '/' },
    ]
  },
}

export default withPayload(nextConfig)
