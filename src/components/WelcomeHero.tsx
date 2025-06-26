'use client'

import { Fieldset } from 'primereact/fieldset'
import { Avatar } from 'primereact/avatar'

/**
 * Welcome Hero component with fancy UI
 *
 * @description
 * A sophisticated welcome section that introduces KAI with modern design elements,
 * animations, and clear call-to-action for users.
 *
 * @component
 * @example
 * ```tsx
 * <WelcomeHero />
 * ```
 *
 * @returns {JSX.Element} Rendered welcome hero component
 */
export function WelcomeHero() {
	return (
		<div className="text-center text-white/90 py-2 sm:py-3">
			{/* Animated KAI Logo */}
			<div className="relative mb-2 sm:mb-3">
				<div className="mb-2 kai-float">
					<div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto">
						<div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
						<div className="relative z-10 w-full h-full flex items-center justify-center">
							<Avatar
								image="/kai-logo-4.png"
								size="large"
								className="!w-8 !h-8 sm:!w-12 sm:!h-12 md:!w-16 md:!h-16 object-contain"
							/>
						</div>
					</div>
				</div>
				{/* Floating particles */}
				<div className="absolute top-0 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-bounce opacity-60"></div>
				<div
					className="absolute top-4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"
					style={{ animationDelay: '0.5s' }}
				></div>
				<div
					className="absolute bottom-0 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-60"
					style={{ animationDelay: '1s' }}
				></div>
			</div>

			{/* Main Title */}
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 kai-gradient-text">
				Welcome to KAI
			</h1>

			{/* Subtitle */}
			<p className="text-sm sm:text-base md:text-lg text-white/70 mb-3 font-light">
				Your AI-powered frontend development assistant
			</p>

			{/* Call to Action */}
			<Fieldset legend="Ready to get started?" className="mt-2">
				<p className="text-xs sm:text-sm text-white/70">
					Type your question below and let&apos;s build something amazing
					together!
				</p>
			</Fieldset>
		</div>
	)
}
