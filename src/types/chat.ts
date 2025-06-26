export interface Message {
	id: string
	role: 'user' | 'assistant'
	content: string
	timestamp: Date
}

export interface ChatState {
	messages: Message[]
	isLoading: boolean
	error: string | null
}

export interface UsageLimit {
	count: number
	lastUsed: string
} 