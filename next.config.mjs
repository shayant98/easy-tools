/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */

/** @type {import("next").NextConfig} */
const config = {
	experimental: {
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				pathname: "/**/**",
			},
		],
	},
};

export default config;
