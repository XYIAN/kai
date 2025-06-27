/**
 * API utility for KAI chatbot
 * Handles API calls in both development and production environments
 */

/**
 * Get the appropriate API endpoint based on the environment
 * @returns The API endpoint URL
 */
function getApiEndpoint(): string {
	// Check if we're in a browser environment
	if (typeof window !== 'undefined') {
		// In development (localhost), use the Next.js API route
		if (
			window.location.hostname === 'localhost' ||
			window.location.hostname === '127.0.0.1'
		) {
			return '/api/chat'
		}

		// In production (Netlify), use the Netlify Function endpoint
		return '/.netlify/functions/chat'
	}

	// Fallback for server-side rendering
	return '/api/chat'
}

/**
 * Send a chat message to the API
 * @param message - The message to send
 * @returns Promise with the API response
 */
export async function sendChatMessage(message: string): Promise<Response> {
	const endpoint = getApiEndpoint()

	console.log('🧙‍♂️ KAI API Call:', {
		endpoint,
		environment: typeof window !== 'undefined' ? 'browser' : 'server',
	})

	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ message }),
	})
}
