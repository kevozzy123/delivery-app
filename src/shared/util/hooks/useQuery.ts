import { useRef, useCallback, useEffect } from 'react';
import { isEqual } from 'lodash'
import api from '../http'
import useMergeState from './useMergeState';
import useDeepCompareMemoize from './deepCompareMemoize';
import { IQueryOptions, IApiState } from '@/shared/types';

const CACHE_FIRST = 'cache-first'
const NO_CACHE = 'no-cache'
const CACHE_ONLY = 'cache-only'

type Result = [
    {
        data: any | null,
        error: any | null,
        isLoading: boolean,
        variables: any,
        setLocalData: (getUpdatedData: any) => void
    },
    (newVariable?: any) => void
]

const useQuery = (
    url: string,
    propsVariable: any = {},
    options: IQueryOptions = {}
) => {
    const { lazy = false, cachePolicy = CACHE_FIRST } = options

    const wasCalled = useRef(false)
    const propsMemoized = useDeepCompareMemoize(propsVariable)
    const isSleeping = lazy && !wasCalled.current
    const isCacheAvailable = cache[url] && isEqual(cache[url].apiVariable, propsVariable)
    const canUseCache = isCacheAvailable && !wasCalled.current && cachePolicy !== NO_CACHE

    // array doesn't work here
    const { state, mergeState } = useMergeState<IApiState>({
        data: canUseCache ? cache[url].data : null,
        error: null,
        isLoading: !lazy && !canUseCache,
        variables: {}
    })

    const sendRequest = useCallback(
        (newVariable?: any) => {
            const variables = { ...state.variables, ...(newVariable || {}) }
            const apiVariable = { ...propsMemoized, ...variables }

            const skipLoading = canUseCache && cachePolicy === CACHE_FIRST
            // console.log('can use cache', skipLoading)
            console.log('can use cache', canUseCache)
            console.log('policy', cachePolicy === CACHE_FIRST)
            if (!skipLoading) {
                mergeState({ isLoading: true, variables });
            } else if (newVariable) {
                mergeState({ variables });
            }

            api.get(url, apiVariable).then(data => {
                cache[url] = { data, apiVariable }
                mergeState({ data, error: null, isLoading: false })
            })

            wasCalled.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [propsMemoized]
    )

    useEffect(() => {
        if (isSleeping) return
        if (canUseCache && cachePolicy === CACHE_ONLY) return

        sendRequest()
    }, [sendRequest, cachePolicy, canUseCache, isSleeping])

    const setLocalData = useCallback((getUpdatedData: any) => {
        mergeState(({ data }) => {
            const updatedData = getUpdatedData(data);
            cache[url] = { ...(cache[url] || {}), data: updatedData };
            return { data: updatedData };
        })
    }, [mergeState, url])

    const results: Result = [
        {
            data: state.data,
            error: state.error,
            isLoading: state.isLoading,
            variables: { ...propsMemoized, ...state.variables },
            setLocalData,
        },
        sendRequest
    ];

    return results
}

const cache: { [key: string]: { data: any, apiVariable: any } } = {}

export default useQuery
// const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
//     const mountedRef = useIsMounted();
//     return useCallback(
//         (...args: T[]) => (mountedRef.current ? dispatch(...args) : undefined),
//         [dispatch, mountedRef]
//     );
// };
