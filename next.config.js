/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: 'file-loader',
    })
    
    // Fix for @react-pdf/renderer
    config.externals = [...(config.externals || []), { canvas: "canvas" }]
    
    return config
  },
}

module.exports = nextConfig