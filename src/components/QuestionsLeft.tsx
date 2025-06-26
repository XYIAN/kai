'use client'

interface QuestionsLeftProps {
	count: number
}

/**
 * Questions left counter component
 *
 * @description
 * A subtle component that displays the number of questions left for the day.
 * Positioned at the bottom of the chat with reduced opacity for subtlety.
 *
 * @component
 * @example
 * ```tsx
 * <QuestionsLeft count={5} />
 * ```
 *
 * @param {QuestionsLeftProps} props - Component props
 * @param {number} props.count - Number of questions remaining
 *
 * @returns {JSX.Element} Rendered questions left component
 */
export function QuestionsLeft({ count }: QuestionsLeftProps) {
	return (
		<div className="text-center opacity-50 p-2">
			<div className="inline-flex align-items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
				<i className="pi pi-clock text-teal-400 px-1"></i>
				<span className="text-white/80 text-xs font-medium">
					{count} questions left today
				</span>
			</div>
		</div>
	)
}
