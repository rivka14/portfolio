/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;