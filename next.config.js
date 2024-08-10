/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/node-provider",
        destination: "/node-provider/workers",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/chain/:path*",
        destination: `${process.env.ADION_CHAIN}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
