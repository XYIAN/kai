'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { QuestionsLeft } from './QuestionsLeft'
import { WelcomeHero } from './WelcomeHero'
import { Message as ChatMessageType } from '@/types/chat'
import { useUsageLimit } from '@/hooks/useUsageLimit'
import { KaiThemeProvider } from './KaiThemeProvider'
import { Card } from 'primereact/card'
import { Message } from 'primereact/message'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Avatar } from 'primereact/avatar'

export function Chat() {
	const [messages, setMessages] = useState<ChatMessageType[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const { incrementUsage, isLimitReached, remainingQuestions } = useUsageLimit()

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const sendMessage = async (content: string) => {
		if (isLimitReached) return

		const userMessage: ChatMessageType = {
			id: Date.now().toString(),
			role: 'user',
			content,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: content }),
			})

			if (!response.ok) {
				try {
					const errorData = await response.json()
					throw new Error(
						errorData.error || `HTTP ${response.status}: ${response.statusText}`
					)
				} catch {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`)
				}
			}

			const reader = response.body?.getReader()
			if (!reader) {
				throw new Error('No response body')
			}

			const assistantMessage: ChatMessageType = {
				id: (Date.now() + 1).toString(),
				role: 'assistant',
				content: '',
				timestamp: new Date(),
			}

			setMessages((prev) => [...prev, assistantMessage])

			const decoder = new TextDecoder()
			let fullContent = ''

			while (true) {
				const { done, value } = await reader.read()
				if (done) break

				const chunk = decoder.decode(value)
				fullContent += chunk

				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === assistantMessage.id
							? { ...msg, content: fullContent }
							: msg
					)
				)
			}

			incrementUsage()
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'An error occurred'
			setError(errorMessage)
			setMessages((prev) => prev.filter((msg) => msg.role === 'user'))
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<KaiThemeProvider>
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
									<Card>
										<div className="flex items-center gap-2 mb-2">
											<Avatar
												image="/kai-logo-4.png"
												size="normal"
												className="w-6 h-6"
											/>
											<span className="text-xs text-white/70 font-medium">
												Kyle AI
											</span>
										</div>
										<ProgressSpinner
											style={{ width: '20px', height: '20px' }}
										/>
									</Card>
								</div>
								<div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mx-2 order-2">
									<Avatar
										image="/kai-logo-4.png"
										size="normal"
										className="w-8 h-8"
									/>
								</div>
							</div>
						)}

						{error && (
							<div className="flex justify-center mb-4">
								<Message severity="error" text={error} className="max-w-md" />
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
			</div>
		</KaiThemeProvider>
	)
}
