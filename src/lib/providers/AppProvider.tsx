'use client'

import { ReactNode } from 'react'
import { PrimeReactProvider } from './PrimeReactProvider'
import { KaiThemeProvider } from './KaiThemeProvider'

interface AppProviderProps {
	children: ReactNode
}

/**
 * Main Application Provider
 *
 * @description
 * Composes all application providers in the correct order.
 * This is the single provider that should be used in the root layout.
 *
 * Provider order:
 * 1. PrimeReactProvider - Base UI library provider
 * 2. KaiThemeProvider - Custom theme and styling provider
 *
 * @component
 * @example
 * ```tsx
 * <AppProvider>
 *   <App />
 * </AppProvider>
 * ```
 *
 * @param {AppProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 *
 * @returns {JSX.Element} Composed provider wrapper
 */
export function AppProvider({ children }: AppProviderProps) {
	return (
		<PrimeReactProvider>
			<KaiThemeProvider>{children}</KaiThemeProvider>
		</PrimeReactProvider>
	)
}
