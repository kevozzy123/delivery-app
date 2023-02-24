import useMergeState from "./useMergeState";
import api from "../http";
import { IApiState, IPropOptions } from "@/shared/types";
import { useCallback } from "react";

type method = 'get' | 'post' | 'put' | 'delete' | 'patch'

const useMutation = (method: method, url: string) => {
    const { state, mergeState } = useMergeState<Omit<IApiState, "variables">>({
        data: null,
        error: null,
        isLoading: false
    })

    const sendRequest = useCallback(
        (variables: IPropOptions = {}) => {
            return new Promise((resolve, reject) => {
                mergeState({ isLoading: true })

                api[method](url, variables)
                    .then((data: any) => {
                        resolve(data)
                        mergeState({ data, error: null, isLoading: false })
                    })
                    .catch((error))
            })
        }, [])
}