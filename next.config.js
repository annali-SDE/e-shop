/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				pathname: '**'
			}
		]
	},
	experimental: {
		missingSuspenseWithCSRBailout: false
	},
	pageExtensions: [
		'page.tsx',
		'page.ts',
		// FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
		// Instead, use `not-found.ts` as a workaround
		// "ts" is required to resolve `not-found.ts`
		// https://github.com/vercel/next.js/issues/65447
		'ts'
	]
};

module.exports = nextConfig;
