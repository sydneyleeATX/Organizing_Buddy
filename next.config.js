/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost']
  },
  // Configure Next.js to use src directory
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname + '/src'
    return config
  },
  output: 'export',
  distDir: '.next'
}

module.exports = nextConfig
