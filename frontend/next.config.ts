import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    optimizeCss: true,
    scrollRestoration: true,
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, immutable" },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'naiscorp.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev'
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com'
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com'
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      },
      {
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com'
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  reactStrictMode: true,
  output: 'standalone',
  webpack(config, { isServer }) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    };
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });
    config.optimization.splitChunks = {
      chunks: "all",
    };
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
      config.resolve.fallback = {
        ...config.resolve.fallback,
        worker_threads: false,
        fs: false,
        ws: false,
        dns: false,
        net: false,
        canvas: false,
        encoding: false,
        stream: false,
        crypto: false,
      };
    }
    return config;
  },
  env: {
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_HOST: process.env.SHOPIFY_HOST,
    SHOPIFY_API_URL: process.env.SHOPIFY_API_URL,
    SHOPIFY_APP_NAME: process.env.SHOPIFY_APP_NAME,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    GOOGLE_DEVELOPER_KEY: process.env.GOOGLE_DEVELOPER_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
    HOSTINGER_PASSWORD: process.env.HOSTINGER_PASSWORD,
    NGROK_DOMAIN: process.env.NGROK_DOMAIN,
    NGROK_URL: process.env.NGROK_URL,
    EMAIL_TO: process.env.EMAIL_TO,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY: process.env.UNSPLASH_SECRET_KEY,
    EDGE_STORE_ACCESS_KEY: process.env.EDGE_STORE_ACCESS_KEY,
    EDGE_STORE_SECRET_KEY: process.env.EDGE_STORE_SECRET_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    PROXY_HOST: process.env.PROXY_HOST,
    PROXY_PORT: process.env.PROXY_PORT,
  },
};

const sentryConfig = {
  org: "wapp-4y",
  project: "naiscorp",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

// Suppress Turbopack warning
process.env.SENTRY_SUPPRESS_TURBOPACK_WARNING = '1';

// Apply bundle analyzer and Sentry configs
const configWithBundleAnalyzer = withBundleAnalyzer(nextConfig);
const finalConfig = withSentryConfig(configWithBundleAnalyzer, sentryConfig);

export default finalConfig;