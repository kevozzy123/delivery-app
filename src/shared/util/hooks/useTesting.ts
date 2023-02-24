import { useEffect, useRef } from "react"

const useTesting = (prop: string, num: number) => {
    const value = useRef(1)

    useEffect(() => {
        if (num) {
            value.current = num
        }
        console.log('cache ran', Object.keys(cache).length)
    }, [])

    cache[prop] = value.current

    return cache
}

const cache: { [key: string]: any } = {}

export default useTesting