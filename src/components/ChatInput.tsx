'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'

interface ChatInputProps {
	onSendMessage: (message: string) => void
	isLoading: boolean
	isLimitReached: boolean
}

export function ChatInput({
	onSendMessage,
	isLoading,
	isLimitReached,
}: ChatInputProps) {
	const [message, setMessage] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (message.trim() && !isLoading && !isLimitReached) {
			onSendMessage(message.trim())
			setMessage('')
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmit(e)
		}
	}

	useEffect(() => {
		if (!isLoading) {
			inputRef.current?.focus()
		}
	}, [isLoading])

	return (
		<Card className="rounded-xl shadow-lg">
			<form onSubmit={handleSubmit} className="w-full">
				<div className="flex gap-3 items-end w-full">
					<div className="flex-1">
						<InputText
							ref={inputRef}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder={
								isLimitReached
									? "KAI's magic is recharging. Come back tomorrow."
									: 'Ask Kyle anything...'
							}
							disabled={isLoading || isLimitReached}
							className="w-full"
							autoComplete="off"
						/>
					</div>
					<Button
						type="submit"
						icon="pi pi-send"
						disabled={!message.trim() || isLoading || isLimitReached}
						loading={isLoading}
						className="p-button-primary"
					/>
				</div>
			</form>
		</Card>
	)
}
