import nextMDX from '@next/mdx';
import path from 'path';
const mediaStylesPath = path
  .join(process.cwd(), 'src/ui/styles/abstracts/_media.scss')
  .replace(/\\/g, '/');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `
      @use "${mediaStylesPath}" as media;
    `,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack(config) {
    const assetRule = config.module.rules.find((rule) => rule?.test?.test?.('.svg'));
    if (assetRule) assetRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
};

const withMDX = nextMDX({});

export default withMDX(nextConfig);
