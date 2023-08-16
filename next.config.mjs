/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */

import removeImports from "next-remove-imports";

const removeImportsFun = removeImports({
  options: {},
});
function defineNextConfig(config) {
  return config;
}

export default removeImportsFun(
  defineNextConfig({
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    swcMinify: true,
    async headers() {
      return [
        {
          source: "/pkg-sizer",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "require-corp",
            },
            {
              key: "Cross-Origin-Opener-Policy",
              value: "same-origin",
            },
            {
              key: "X-Frame-Options",
              value: "same-origin",
            },
            {
              key: "Cross-Origin-Resource-Policy",
              value: "cross-origin",
            },
          ],
        },
      ];
    },
    webpack: (config, options) => {
      config.resolve.alias.canvas = false;
      config.resolve.alias.encoding = false;
      config.resolve.alias.ws = false;
      return config;
    },
    // // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    // i18n: {
    //   locales: ["en"],
    //   defaultLocale: "en",
    // },
  })
);
