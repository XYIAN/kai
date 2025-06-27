import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'KAI',
	description: 'The KyleAI chatbot',
	keywords: 'AI, chatbot, frontend, React, Next.js, TypeScript',
	authors: [{ name: 'KAI' }],
	icons: {
		icon: '/favicon.png',
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	)
}
