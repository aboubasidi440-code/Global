import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Le serveur de développement est servi derrière le proxy de prévisualisation.
  allowedDevOrigins: ['*.e2b.app', '*.arena.ai', 'localhost'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
  },
};

export default nextConfig;
