/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com']
  },
}

module.exports = nextConfig
