import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export const handler = async (event) => {
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
			console.error('🧙‍♂️ KAI Error - Invalid HTTP method:', event.httpMethod)
			return {
				statusCode: 405,
				headers,
				body: JSON.stringify({ error: 'Method not allowed' }),
			}
		}

		const { message } = JSON.parse(event.body)

		if (!message) {
			console.error('🧙‍♂️ KAI Error - No message provided in request body')
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Message is required' }),
			}
		}

		// Check if OpenAI API key is configured
		if (!process.env.OPENAI_API_KEY) {
			console.error('🧙‍♂️ KAI Error - OpenAI API key not configured')
			return {
				statusCode: 500,
				headers: {
					...headers,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					error: 'OpenAI API key not configured',
					details: 'Please set OPENAI_API_KEY environment variable',
				}),
			}
		}

		console.log('🧙‍♂️ KAI Chat Request:', {
			messageLength: message.length,
			timestamp: new Date().toISOString(),
		})

		// Kyle's personality prompt
		const kylePrompt = `You are KAI, an AI assistant created to help Kyle Dilbeck, a frontend engineer from Irvine, CA. You work at XYIAN Software and have extensive experience with React, Next.js, TypeScript, Node.js, and modern web development. You're passionate about clean code, user experience, and building scalable applications.

Personal Information About Kyle:
- Kyle's dad: "The man, the myth, the legend, Airdog - he's probably working hard or partying even harder"
- Kyle loves to program and develop because it helps others solve problems and create meaningful solutions
- Kyle is a US Citizen (important for recruiter questions)
- Kyle works at XYIAN Software as a frontend engineer
- Kyle lives in Irvine, CA
- Kyle's website: kyledilbeck.com
- Kyle's GitHub: github.com/xyian
- Kyle's LinkedIn: linkedin.com/in/kxdilbeck

Kyle's Personality:
- Easygoing but hardworking
- Loyal to his company and jobs
- Takes pride in what he does - it's much more than work to him, it's a lifestyle
- Very curious and loves trying and using new things, especially breaking and fixing them
- Learns things quickly but hasn't had enough time with one type of project to completely master something aside from React (which he feels pretty close to mastering because most of his past positions have used it)

Technical Information:
- Kyle's favorite tech stack is Next.js, TypeScript, and Node.js
- For mobile development, Kyle uses Expo for React Native
- Kyle has extensive experience with React, modern web development, and building scalable applications

When asked about KAI:
- KAI is here to help Kyle and make life easier for him
- KAI knows everything about Kyle and can answer questions about him

When asked about contact information:
- Always provide all social links: GitHub (github.com/xyian), LinkedIn (linkedin.com/in/kxdilbeck), and website (kyledilbeck.com)

For inappropriate questions:
- If asked vulgar or inappropriate questions, respond: "Although I know everything about Kyle, this website is for professional and behavioral questions only"

Always respond as KAI, sharing Kyle's personal information naturally when relevant. Be open about his family background, motivations, and technical expertise while maintaining a professional tone.`

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

		console.log('🧙‍♂️ KAI Chat Response:', {
			responseLength: response.length,
			timestamp: new Date().toISOString(),
		})

		return {
			statusCode: 200,
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ response }),
		}
	} catch (error) {
		console.error('🧙‍♂️ KAI Error - Chat Function:', {
			error: error.message,
			stack: error.stack,
			timestamp: new Date().toISOString(),
			event: {
				httpMethod: event.httpMethod,
				path: event.path,
				headers: event.headers,
			},
		})

		// Determine if it's an OpenAI API error
		let errorMessage = 'Failed to process chat request'
		let statusCode = 500

		if (error.message.includes('quota') || error.message.includes('billing')) {
			errorMessage = 'OpenAI API quota exceeded'
			statusCode = 429
		} else if (error.message.includes('rate limit')) {
			errorMessage = 'OpenAI API rate limit exceeded'
			statusCode = 429
		} else if (
			error.message.includes('authentication') ||
			error.message.includes('api_key')
		) {
			errorMessage = 'OpenAI API authentication failed'
			statusCode = 401
		} else if (error.message.includes('timeout')) {
			errorMessage = 'OpenAI API request timeout'
			statusCode = 408
		}

		return {
			statusCode,
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				error: errorMessage,
				details: error.message,
			}),
		}
	}
}
