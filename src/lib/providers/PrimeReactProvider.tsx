'use client'

import { ReactNode } from 'react'
import { PrimeReactProvider as BasePrimeReactProvider } from 'primereact/api'

interface PrimeReactProviderProps {
	children: ReactNode
}

/**
 * PrimeReact Provider with custom configuration
 *
 * @description
 * Wraps the base PrimeReact provider with any custom configuration
 * needed for the KAI application.
 *
 * @component
 * @example
 * ```tsx
 * <PrimeReactProvider>
 *   <App />
 * </PrimeReactProvider>
 * ```
 *
 * @param {PrimeReactProviderProps} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 *
 * @returns {JSX.Element} PrimeReact provider wrapper
 */
export function PrimeReactProvider({ children }: PrimeReactProviderProps) {
	return <BasePrimeReactProvider>{children}</BasePrimeReactProvider>
}
