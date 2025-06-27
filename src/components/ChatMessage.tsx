'use client'

import { Message as ChatMessageType } from '@/types/chat'
import Image from 'next/image'

interface ChatMessageProps {
	message: ChatMessageType
}

/**
 * Custom chat message component with proper styling
 *
 * @description
 * A custom chat message component that displays user and AI messages with proper styling,
 * using the KAI logo for AI messages and a simple avatar for user messages.
 *
 * @component
 * @example
 * ```tsx
 * <ChatMessage message={messageData} />
 * ```
 *
 * @param {ChatMessageProps} props - Component props
 * @param {Message} props.message - The chat message data
 *
 * @returns {JSX.Element} Rendered chat message component
 */
export function ChatMessage({ message }: ChatMessageProps) {
	const isUser = message.role === 'user'

	return (
		<div
			className={`flex ${
				isUser ? 'justify-end' : 'justify-start'
			} mb-4 align-items-center`}
		>
			<div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
				<div
					className={`
						px-4 py-3 rounded-lg shadow-sm
						${isUser ? 'bg-blue-500 text-white' : 'bg-white/5 backdrop-blur-sm'}
					`}
				>
					{!isUser && (
						<div className="flex items-center gap-2 mb-2 align-items-center">
							<div className="w-[25px] h-[25px] rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
								<Image
									src="/kai-logo-4.png"
									alt="KAI Logo"
									width={25}
									height={25}
									className="w-full h-full object-cover"
									style={{ borderRadius: '10px' }}
								/>
							</div>
							<span className="text-xs text-white/70 font-medium">Kyle AI</span>
						</div>
					)}
					<div className="text-sm leading-relaxed whitespace-pre-wrap">
						{message.content}
					</div>
				</div>
			</div>

			{/* Avatar */}
			<div
				className={`w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center flex-shrink-0 mx-2 ${
					isUser ? 'order-1 bg-white/10' : 'order-2'
				}`}
			>
				{isUser ? (
					<i className="pi pi-user text-white text-xl"></i>
				) : (
					<Image
						src="/kai-logo-2.png"
						alt="KAI Logo"
						width={40}
						height={40}
						className="w-full h-full object-contain"
					/>
				)}
			</div>
		</div>
	)
}
