import { useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export function useThrottle<T>(value: T, interval: number = 500) {
    const [throttleValue, setThrottleValue] = useState<T>(value)

    useEffect(() => {

    }, [value, interval])
}

export const useIsMounted = () => {
    const mountedRef = useRef(false)
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}