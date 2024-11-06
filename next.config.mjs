import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [80, 96, 128, 256],
    imageSizes: [16, 32, 48, 64],
    minimumCacheTTL: 60,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};

// Compose both plugins together
export default withBundleAnalyzer(withNextIntl(nextConfig));
