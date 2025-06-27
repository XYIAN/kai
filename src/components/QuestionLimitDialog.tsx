'use client'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import Image from 'next/image'

interface QuestionLimitDialogProps {
	visible: boolean
	onHide: () => void
	onGetOneMore: () => void
}

/**
 * Custom dialog for when question limit is reached
 *
 * @description
 * A themed dialog that appears when the user has used all their daily questions.
 * Offers options to get one more question or visit the developer's GitHub.
 *
 * @component
 * @example
 * ```tsx
 * <QuestionLimitDialog
 *   visible={showDialog}
 *   onHide={() => setShowDialog(false)}
 *   onGetOneMore={handleGetOneMore}
 * />
 * ```
 *
 * @param {QuestionLimitDialogProps} props - Component props
 * @param {boolean} props.visible - Whether the dialog is visible
 * @param {() => void} props.onHide - Function to call when dialog is closed
 * @param {() => void} props.onGetOneMore - Function to call when user wants one more question
 *
 * @returns {JSX.Element} Rendered dialog component
 */
export function QuestionLimitDialog({
	visible,
	onHide,
	onGetOneMore,
}: QuestionLimitDialogProps) {
	const handleVisitGitHub = () => {
		window.open('https://github.com/XYIAN', '_blank', 'noopener,noreferrer')
		onHide()
	}

	return (
		<Dialog
			visible={visible}
			onHide={onHide}
			modal
			closable={false}
			className="kai-limit-dialog"
			header={
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-full overflow-hidden">
						<Image
							src="/kai-logo-2.png"
							alt="KAI Logo"
							width={32}
							height={32}
							className="w-full h-full object-contain"
						/>
					</div>
					<span className="text-lg font-semibold text-white">
						🧙‍♂️ Wizard&apos;s Limit Reached
					</span>
				</div>
			}
			footer={
				<div className="flex gap-3 justify-end">
					<Button
						label="Visit GitHub"
						icon="pi pi-github"
						className="p-button-outlined p-button-secondary"
						onClick={handleVisitGitHub}
					/>
					<Button
						label="Just one more?"
						icon="pi pi-magic"
						className="p-button-primary"
						onClick={onGetOneMore}
					/>
				</div>
			}
		>
			<Card className="bg-white/5 backdrop-blur-sm border-0">
				<div className="text-center space-y-4">
					<div className="text-6xl mb-4">✨</div>

					<h3 className="text-xl font-semibold text-white mb-3">
						The Wizard&apos;s Magic is Drained!
					</h3>

					<p className="text-white/80 leading-relaxed">
						You&apos;ve reached your daily limit of questions! The wizard needs
						to recharge his magical energy. But don&apos;t worry - there are
						still ways to continue our conversation...
					</p>

					<div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-lg p-4 mt-4">
						<p className="text-sm text-white/70">
							<strong>Option 1:</strong> Visit my GitHub to see more of my work
							and maybe contribute to the project! 🚀
						</p>
						<p className="text-sm text-white/70 mt-2">
							<strong>Option 2:</strong> Ask for &ldquo;just one more&rdquo;
							question - I might be able to squeeze out a little more magic! ✨
						</p>
					</div>
				</div>
			</Card>
		</Dialog>
	)
}
