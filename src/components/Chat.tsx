'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { QuestionsLeft } from './QuestionsLeft'
import { WelcomeHero } from './WelcomeHero'
import { QuestionLimitDialog } from './QuestionLimitDialog'
import { Message as ChatMessageType } from '@/types/chat'
import { useUsageLimit } from '@/hooks/useUsageLimit'
import { Card } from 'primereact/card'
import { Message } from 'primereact/message'
import { Avatar } from 'primereact/avatar'
import { Skeleton } from 'primereact/skeleton'
import { getThemedErrorMessage, logError } from '@/utils/errorMessages'
import { sendChatMessage } from '@/utils/api'
import { playSound } from '@/utils/sounds'

export function Chat() {
	const [messages, setMessages] = useState<ChatMessageType[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showLimitDialog, setShowLimitDialog] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const {
		incrementUsage,
		isLimitReached,
		remainingQuestions,
		giveOneMore,
		oneMoreUsed,
	} = useUsageLimit()

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleGetOneMore = () => {
		giveOneMore()
		setShowLimitDialog(false)
		playSound('response') // Play success sound
	}

	const sendMessage = async (content: string) => {
		// Check if limit is reached and "one more" hasn't been used
		if (remainingQuestions === 0 && !oneMoreUsed) {
			setShowLimitDialog(true)
			playSound('error')
			return
		}

		// Check if limit is reached and "one more" has been used
		if (isLimitReached) {
			playSound('error')
			return
		}

		const userMessage: ChatMessageType = {
			id: Date.now().toString(),
			role: 'user',
			content,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setIsLoading(true)
		setError(null)

		// Play send sound
		playSound('send')

		try {
			const response = await sendChatMessage(content)

			if (!response.ok) {
				let errorMessage: string
				try {
					const errorData = await response.json()
					errorMessage =
						errorData.error || `HTTP ${response.status}: ${response.statusText}`
				} catch {
					errorMessage = `HTTP ${response.status}: ${response.statusText}`
				}

				// Log the technical error for debugging
				logError(new Error(errorMessage), 'Chat API Response')
				throw new Error(errorMessage)
			}

			const data = await response.json()

			if (!data.response) {
				const noResponseError = 'No response from AI'
				logError(new Error(noResponseError), 'Chat API Data')
				throw new Error(noResponseError)
			}

			const assistantMessage: ChatMessageType = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: data.response,
				timestamp: new Date(),
			}

			setMessages((prev) => [...prev, assistantMessage])
			incrementUsage()

			// Play response complete sound
			playSound('response')
		} catch (err) {
			// Log the full error for debugging
			logError(err, 'Chat Send Message')

			// Get the original error message
			const originalError = err instanceof Error ? err.message : String(err)

			// Convert to themed message for user display
			const themedError = getThemedErrorMessage(originalError)
			setError(themedError)

			// Remove the user message since the AI response failed
			setMessages((prev) => prev.filter((msg) => msg.role === 'user'))

			// Play error sound
			playSound('error')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-col gap-2 w-full">
			{/* Chat Container */}
			<Card>
				{/* Messages - much more compact */}
				<div className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-y-auto p-2 sm:p-3 space-y-2 relative kai-chat-scrollbar">
					{messages.length === 0 && <WelcomeHero />}

					{messages.map((message, index) => (
						<div
							key={message.id}
							className={`transition-all duration-500 ${
								index < messages.length - 3
									? 'opacity-60 scale-95'
									: 'opacity-100 scale-100'
							}`}
						>
							<ChatMessage message={message} />
						</div>
					))}

					{isLoading && (
						<div className="flex justify-start mb-4">
							<div className="max-w-[80%] order-1">
								<Card className="bg-white/5 backdrop-blur-sm">
									<div className="flex items-center gap-2 mb-2">
										<Avatar
											image="/kai-logo-4.png"
											shape="circle"
											className="w-[25px] h-[25px] min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] object-contain kai-bounce"
										/>
										<span className="text-xs text-white/70 font-medium">
											Kyle AI
										</span>
									</div>
									<Skeleton
										height="1.5rem"
										width="80%"
										className="mb-2 rounded-lg"
									/>
									<Skeleton
										height="1.2rem"
										width="60%"
										className="rounded-lg"
									/>
								</Card>
							</div>
							<div className="w-[50px] h-[50px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center flex-shrink-0 mx-2 order-2">
								<div className="w-full h-full flex items-center justify-center">
									<Avatar
										image="/kai-logo-2.png"
										shape="circle"
										className="w-full h-full object-contain kai-bounce"
									/>
								</div>
							</div>
						</div>
					)}

					{error && (
						<div className="flex justify-center mb-4">
							<Message
								severity="error"
								text={error}
								className="max-w-md bg-red-500/10 border-red-500/20"
							/>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>
			</Card>

			{/* Input */}
			<ChatInput
				onSendMessage={sendMessage}
				isLoading={isLoading}
				isLimitReached={isLimitReached}
			/>

			{/* Questions Left - positioned under chat input */}
			<QuestionsLeft count={remainingQuestions} />

			{/* Question Limit Dialog */}
			<QuestionLimitDialog
				visible={showLimitDialog}
				onHide={() => setShowLimitDialog(false)}
				onGetOneMore={handleGetOneMore}
			/>
		</div>
	)
}
