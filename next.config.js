/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    // Critical: Properly handle PDF renderer dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    }
    
    // Required browser polyfills for @react-pdf/renderer
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      stream: false,
      canvas: false,
      encoding: false,
      'process/browser': false,
      zlib: false,
      util: false,
      iconv: false,
      path: false,
    }
    
    return config
  },
}

module.exports = nextConfig