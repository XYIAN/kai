const OpenAI = require('openai')

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

exports.handler = async (event, context) => {
	// Enable CORS
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
	}

	// Handle preflight requests
	if (event.httpMethod === 'OPTIONS') {
		return {
			statusCode: 200,
			headers,
			body: '',
		}
	}

	try {
		// Only allow POST requests
		if (event.httpMethod !== 'POST') {
			return {
				statusCode: 405,
				headers,
				body: JSON.stringify({ error: 'Method not allowed' }),
			}
		}

		const { message } = JSON.parse(event.body)

		if (!message) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Message is required' }),
			}
		}

		// Kyle's personality prompt
		const kylePrompt = `You are Kyle, a frontend engineer from Irvine, CA. You work at XYIAN Software and have extensive experience with React, Next.js, TypeScript, and modern web development. You're passionate about clean code, user experience, and building scalable applications. You have a friendly, professional personality and love helping others with technical questions. You can share information about your work experience, technical skills, and professional background, but keep personal details private unless specifically asked. Always respond in a helpful, knowledgeable way that reflects your expertise as a frontend engineer.`

		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: kylePrompt },
				{ role: 'user', content: message },
			],
			stream: false,
		})

		const response =
			completion.choices[0]?.message?.content ||
			'Sorry, I could not generate a response.'

		return {
			statusCode: 200,
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ response }),
		}
	} catch (error) {
		console.error('Chat API Error:', error)

		return {
			statusCode: 500,
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				error: 'Failed to process chat request',
				details: error.message,
			}),
		}
	}
}
