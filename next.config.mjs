/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/recipes',
      destination: '/recipes/1',
      permanent: true,
    },
    {
      source: '/my-recipes',
      destination: '/my-recipes/1',
      permanent: true,
    },
    {
      source: '/favorite-recipes',
      destination: '/favorite-recipes/1',
      permanent: true,
    },
  ],
};

export default nextConfig;
