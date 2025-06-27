/**
 * Sound effects utility for KAI chatbot
 * Handles playing different sounds for various chat interactions
 */

const soundFiles = {
	send: '/sounds/send.mp3',
	response: '/sounds/response.mp3',
	error: '/sounds/error.mp3',
}

/**
 * Play a sound effect (browser only)
 * @param soundName - The name of the sound to play
 */
export function playSound(soundName: 'send' | 'response' | 'error') {
	if (typeof window === 'undefined') return
	try {
		const audio = new window.Audio(soundFiles[soundName])
		audio.volume = 0.3
		audio.currentTime = 0
		audio.play().catch((err) => {
			console.warn('🧙‍♂️ KAI Sound Error:', err)
		})
	} catch (err) {
		console.warn('🧙‍♂️ KAI Sound Error:', err)
	}
}
