'use client'

import { ReactNode } from 'react'

interface KaiThemeProviderProps {
	children: ReactNode
}

/**
 * KAI Custom Theme Provider
 *
 * @description
 * Provides custom theme overrides for PrimeReact components used in the KAI chatbot.
 * This component applies glassmorphism styling and custom color schemes to maintain
 * consistency across the application.
 *
 * @component
 * @example
 * ```tsx
 * <KaiThemeProvider>
 *   <Chat />
 * </KaiThemeProvider>
 * ```
 *
 * @param {KaiThemeProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to wrap with theme
 *
 * @returns {JSX.Element} Theme provider wrapper
 */
export function KaiThemeProvider({ children }: KaiThemeProviderProps) {
	return <div className="kai-theme-provider">{children}</div>
}
