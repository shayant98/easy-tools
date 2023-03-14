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
    swcMinify: true,

    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
  })
);
