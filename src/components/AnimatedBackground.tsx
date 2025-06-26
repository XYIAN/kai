'use client'

import Image from 'next/image'

export function AnimatedBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-red-500">
			{/* KAI Background Image */}
			<div className="absolute inset-0">
				<Image
					src="/kai-bg-1.png"
					alt="KAI Background"
					fill
					className="object-cover object-center"
					priority
					quality={90}
					style={{ zIndex: -1 }}
					onLoad={() => console.log('Background image loaded successfully')}
					onError={(e) => console.error('Background image failed to load:', e)}
				/>
			</div>

			{/* Overlay for better text readability */}
			<div
				className="absolute inset-0 bg-black/30"
				style={{ zIndex: -1 }}
			></div>

			{/* Subtle floating elements for depth */}
			<div
				className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: '2s', zIndex: -1 }}
			></div>
			<div
				className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: '4s', zIndex: -1 }}
			></div>
			<div
				className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
				style={{ animationDelay: '1s', zIndex: -1 }}
			></div>
		</div>
	)
}
