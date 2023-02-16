import { useCallback, useReducer, useState } from "react";
import { useIsMounted } from "./userExprience";

interface State<D> {
    error: Error | null;
    data: D | null;
    status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
    status: "idle",
    data: null,
    error: null,
};

const defaultConfig = {
    throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useIsMounted();
    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : undefined),
        [dispatch, mountedRef]
    );
};

export const useApi = <D>(
    initialState?: State<D>,
    initialConfig?: typeof defaultConfig
) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialState,
            ...initialState,
        }
    );
    const safeDispatch = useSafeDispatch(dispatch);

    const [retry, setRetry] = useState(() => () => { });

    const setData = useCallback(
        (data: D) =>
            safeDispatch({
                data,
                status: "success",
                error: null,
            }),
        [safeDispatch]
    );

    const setError = useCallback(
        (error: Error) =>
            safeDispatch({
                error,
                status: "error",
                data: null,
            }),
        [safeDispatch]
    );

    // run 用来触发异步请求
    const callApi = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error("请传入 Promise 类型数据");
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    callApi(runConfig?.retry(), runConfig);
                }
            });
            safeDispatch({ status: "loading" });
            return promise
                .then((data) => {
                    setData(data);
                    return data;
                })
                .catch((error) => {
                    setError(error);
                    if (config.throwOnError) return Promise.reject(error);
                    return error;
                });
        },
        [config.throwOnError, setData, setError, safeDispatch]
    );

    return {
        isIdle: state.status === "idle",
        isLoading: state.status === "loading",
        isError: state.status === "error",
        isSuccess: state.status === "success",
        callApi,
        setData,
        setError,
        retry,
        ...state,
    };
};