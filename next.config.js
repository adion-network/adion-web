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
}

module.exports = nextConfig
