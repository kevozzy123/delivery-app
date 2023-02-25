import useQuery from "./useQuery";
import useMutation from "./useMutation";
import { IQueryOptions, IPropOptions } from "@/shared/types";

/* eslint-disable react-hooks/rules-of-hooks */
const useHttp = {
    get: (
        url: string,
        propsVariable?: IPropOptions,
        options?: IQueryOptions
    ) => useQuery(url, propsVariable, options),
    post: (url: string) => useMutation('post', url),
    put: (url: string) => useMutation('put', url),
    patch: (url: string) => useMutation('patch', url),
    delete: (url: string) => useMutation('delete', url),
}

export default useHttp