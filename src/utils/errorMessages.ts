/**
 * Themed error messages for KAI chatbot
 * Maps technical errors to fun wizard/magic-themed messages
 */

interface ErrorMapping {
	[key: string]: string
}

const errorMessages: ErrorMapping = {
	// Network errors
	'Failed to fetch':
		"🧙‍♂️ The wizard's crystal ball went cloudy! Check your connection.",
	'Network Error': '🌐 The magical network is having a moment. Try again!',

	// HTTP errors
	'HTTP 401': "🔐 The wizard's spell book is locked! (Authentication error)",
	'HTTP 403': '🚫 The wizard says "thou shalt not pass!" (Access denied)',
	'HTTP 404': "🔍 The wizard's tower seems to have vanished! (API not found)",
	'HTTP 429':
		'⏰ The wizard is too busy casting spells! Try again in a moment.',
	'HTTP 500': "💥 The wizard's spell backfired! (Server error)",
	'HTTP 502': "🌪️ The wizard's portal is unstable! (Bad gateway)",
	'HTTP 503': "🏰 The wizard's tower is under maintenance!",
	'HTTP 504': '⏳ The wizard is taking too long to respond! (Timeout)',

	// OpenAI specific errors
	'No response from AI': '🤖 The AI familiar is taking a nap!',
	'OpenAI API': '🔮 The AI crystal ball is malfunctioning!',
	'quota exceeded':
		'💰 The wizard ran out of magical coins! (API quota exceeded)',
	'rate limit': '⚡ Too many spells at once! Slow down a bit.',

	// Generic errors
	'An error occurred':
		"✨ Something mysterious happened in the wizard's tower!",
	'Unknown error': "🔮 The wizard's crystal ball is showing static!",
}

/**
 * Get a themed error message for the given error
 * @param error - The original error message
 * @returns A themed error message
 */
export function getThemedErrorMessage(error: string): string {
	// Check for exact matches first
	if (errorMessages[error]) {
		return errorMessages[error]
	}

	// Check for partial matches
	for (const [key, message] of Object.entries(errorMessages)) {
		if (error.toLowerCase().includes(key.toLowerCase())) {
			return message
		}
	}

	// Default themed message
	return "🧙‍♂️ The wizard's spell fizzled! Something went wrong in the magical realm."
}

/**
 * Log error details for debugging
 * @param error - The error object or message
 * @param context - Additional context about where the error occurred
 */
export function logError(error: unknown, context: string = 'Chat'): void {
	const timestamp = new Date().toISOString()
	const errorMessage = error instanceof Error ? error.message : String(error)
	const errorStack = error instanceof Error ? error.stack : undefined

	console.group(`🧙‍♂️ KAI Error - ${context} (${timestamp})`)
	console.error('Error Message:', errorMessage)
	if (errorStack) {
		console.error('Error Stack:', errorStack)
	}
	console.error('Full Error Object:', error)
	console.groupEnd()
}
