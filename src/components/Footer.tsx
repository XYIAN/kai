'use client'

import { Button } from 'primereact/button'

export function Footer() {
	const handleGitHubClick = () => {
		window.open('https://github.com/XYIAN', '_blank')
	}

	return (
		<footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
			<Button
				icon="pi pi-github"
				label="Follow me on GitHub"
				className="p-button-text p-button-sm bg-white/10 hover:bg-white/20 text-white border-white/20"
				onClick={handleGitHubClick}
			/>
		</footer>
	)
}
