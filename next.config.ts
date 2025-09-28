import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    localeDetection: false,
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
