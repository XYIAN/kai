'use client'

import { Chat } from '@/components/Chat'
import { PortfolioHeader } from '@/components/PortfolioHeader'
import { Footer } from '@/components/Footer'
import { Panel } from 'primereact/panel'

export default function Home() {
	return (
		<main className="h-screen relative overflow-hidden">
			{/* SpeedDial positioned absolutely in top left */}
			<div className="fixed top-4 left-4 z-50">
				<PortfolioHeader />
			</div>

			{/* Main Content - restored proper padding */}
			<div className="h-screen flex items-center justify-center p-4">
				<Panel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg opacity-75">
					<Chat />
				</Panel>
			</div>

			{/* Footer with GitHub link */}
			<Footer />
		</main>
	)
}
