'use client'

import { useState, useEffect } from 'react'
import { UsageLimit } from '@/types/chat'

const MAX_DAILY_QUESTIONS = 10
const STORAGE_KEYS = {
	usageCount: 'kai_usage_count',
	lastUsed: 'kai_last_used',
	oneMoreUsed: 'kai_one_more_used',
}

export function useUsageLimit() {
	const [usageLimit, setUsageLimit] = useState<UsageLimit>({
		count: 0,
		lastUsed: '',
	})
	const [oneMoreUsed, setOneMoreUsed] = useState(false)

	useEffect(() => {
		// Load usage data from localStorage
		const storedCount = localStorage.getItem(STORAGE_KEYS.usageCount)
		const storedLastUsed = localStorage.getItem(STORAGE_KEYS.lastUsed)
		const storedOneMoreUsed = localStorage.getItem(STORAGE_KEYS.oneMoreUsed)

		if (storedCount && storedLastUsed) {
			const lastUsedDate = new Date(storedLastUsed)
			const today = new Date()

			// Check if it's a new day
			if (lastUsedDate.toDateString() === today.toDateString()) {
				setUsageLimit({
					count: parseInt(storedCount, 10),
					lastUsed: storedLastUsed,
				})

				// Check if "one more" was used today
				if (storedOneMoreUsed) {
					const oneMoreDate = new Date(storedOneMoreUsed)
					if (oneMoreDate.toDateString() === today.toDateString()) {
						setOneMoreUsed(true)
					}
				}
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
		setOneMoreUsed(false)

		localStorage.setItem(STORAGE_KEYS.usageCount, '0')
		localStorage.setItem(STORAGE_KEYS.lastUsed, new Date().toISOString())
		localStorage.removeItem(STORAGE_KEYS.oneMoreUsed)
	}

	const giveOneMore = () => {
		if (!oneMoreUsed) {
			setOneMoreUsed(true)
			localStorage.setItem(STORAGE_KEYS.oneMoreUsed, new Date().toISOString())
		}
	}

	const isLimitReached = usageLimit.count >= MAX_DAILY_QUESTIONS && oneMoreUsed

	return {
		usageLimit,
		incrementUsage,
		resetUsage,
		giveOneMore,
		isLimitReached,
		oneMoreUsed,
		remainingQuestions: Math.max(
			0,
			MAX_DAILY_QUESTIONS - usageLimit.count + (oneMoreUsed ? 1 : 0)
		),
	}
}
