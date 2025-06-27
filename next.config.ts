import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Enable static export for Netlify deployment
	output: 'export',
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
}

export default nextConfig
