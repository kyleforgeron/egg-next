/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CTFL_SPACE: process.env.CTFL_SPACE,
    CTFL_ACCESSTOKEN: process.env.CTFL_ACCESSTOKEN,
    NYT_KEY: process.env.NYT_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
}

module.exports = nextConfig
