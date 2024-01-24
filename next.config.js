/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/node-provider/overview",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
