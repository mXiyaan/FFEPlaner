/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false
    }
    
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
      path: false
    }
    
    return config
  },
}

module.exports = nextConfig