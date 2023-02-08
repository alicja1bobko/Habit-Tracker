/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
};

module.exports = nextConfig
