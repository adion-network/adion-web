/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/cloud",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
