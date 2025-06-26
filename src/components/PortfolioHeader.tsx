'use client'

import { SpeedDial } from 'primereact/speeddial'
import { socialLinks } from '@/constants/socialLinks'
import { GiWizardFace } from 'react-icons/gi'

export function PortfolioHeader() {
	const speedDialItems = socialLinks.map((link) => ({
		label: link.label,
		icon: link.icon,
		command: () => {
			window.open(link.url, '_blank', 'noopener,noreferrer')
		},
	}))

	return (
		<SpeedDial
			model={speedDialItems}
			direction="down"
			showIcon={<GiWizardFace className="text-2xl" />}
			hideIcon="pi pi-times"
		/>
	)
}
