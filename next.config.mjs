/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
