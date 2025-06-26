'use client'

import { useState, useEffect } from 'react'
import { UsageLimit } from '@/types/chat'

const MAX_DAILY_QUESTIONS = 10
const STORAGE_KEYS = {
	usageCount: 'kai_usage_count',
	lastUsed: 'kai_last_used',
}

export function useUsageLimit() {
	const [usageLimit, setUsageLimit] = useState<UsageLimit>({
		count: 0,
		lastUsed: '',
	})

	useEffect(() => {
		// Load usage data from localStorage
		const storedCount = localStorage.getItem(STORAGE_KEYS.usageCount)
		const storedLastUsed = localStorage.getItem(STORAGE_KEYS.lastUsed)

		if (storedCount && storedLastUsed) {
			const lastUsedDate = new Date(storedLastUsed)
			const today = new Date()

			// Check if it's a new day
			if (lastUsedDate.toDateString() === today.toDateString()) {
				setUsageLimit({
					count: parseInt(storedCount, 10),
					lastUsed: storedLastUsed,
				})
			} else {
				// Reset for new day
				resetUsage()
			}
		}
	}, [])

	const incrementUsage = () => {
		const newCount = usageLimit.count + 1
		const now = new Date().toISOString()

		setUsageLimit({
			count: newCount,
			lastUsed: now,
		})

		localStorage.setItem(STORAGE_KEYS.usageCount, newCount.toString())
		localStorage.setItem(STORAGE_KEYS.lastUsed, now)
	}

	const resetUsage = () => {
		setUsageLimit({
			count: 0,
			lastUsed: new Date().toISOString(),
		})

		localStorage.setItem(STORAGE_KEYS.usageCount, '0')
		localStorage.setItem(STORAGE_KEYS.lastUsed, new Date().toISOString())
	}

	const isLimitReached = usageLimit.count >= MAX_DAILY_QUESTIONS

	return {
		usageLimit,
		incrementUsage,
		resetUsage,
		isLimitReached,
		remainingQuestions: Math.max(0, MAX_DAILY_QUESTIONS - usageLimit.count),
	}
} 