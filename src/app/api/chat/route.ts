import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
	try {
		const { message } = await request.json()

		if (!message) {
			console.error('🧙‍♂️ KAI Error - No message provided in request body')
			return NextResponse.json(
				{ error: 'Message is required' },
				{ status: 400 }
			)
		}

		// Check if OpenAI API key is configured
		if (!process.env.OPENAI_API_KEY) {
			console.error('🧙‍♂️ KAI Error - OpenAI API key not configured')
			return NextResponse.json(
				{
					error: 'OpenAI API key not configured',
					details: 'Please set OPENAI_API_KEY environment variable',
				},
				{ status: 500 }
			)
		}

		console.log('🧙‍♂️ KAI Chat Request:', {
			messageLength: message.length,
			timestamp: new Date().toISOString(),
		})

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

		console.log('🧙‍♂️ KAI Chat Response:', {
			responseLength: response.length,
			timestamp: new Date().toISOString(),
		})

		return NextResponse.json({ response })
	} catch (error) {
		console.error('🧙‍♂️ KAI Error - Chat API Route:', {
			error: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
			timestamp: new Date().toISOString(),
		})

		// Determine if it's an OpenAI API error
		let errorMessage = 'Failed to process chat request'
		let statusCode = 500

		if (error instanceof Error) {
			if (
				error.message.includes('quota') ||
				error.message.includes('billing')
			) {
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
		}

		return NextResponse.json(
			{
				error: errorMessage,
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: statusCode }
		)
	}
}
