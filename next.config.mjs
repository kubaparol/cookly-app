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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
    {
      source: '/comments/received',
      destination: '/comments/received/1',
      permanent: true,
    },
    {
      source: '/comments/made',
      destination: '/comments/made/1',
      permanent: true,
    },
  ],
};

export default nextConfig;
