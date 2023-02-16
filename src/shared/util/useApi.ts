import { useState } from "react"

interface State<D> {
    error: Error | null,
    data: D | null,
    state: 'idle' | 'loading' | 'error' | 'success'
}

export const useApi = <D>({ state = 'idle', data = null, error = null }: State<D>) => {
    const [request, setRequest] = useState({
        state: state,
        data: data,
        error: error
    })

    const setData = (data: D) => setRequest({
        state: 'success',
        data: data,
        error: null
    })

    const setError = (error: Error) => setRequest({
        state: 'error',
        data: null,
        error: error
    })

    const
}