import useQuery from "./useQuery";
import { IQueryOptions, IPropOptions } from "@/shared/types";

export const api = {
    get: (
        url: string,
        propsVariable?: IPropOptions,
        options?: IQueryOptions
    ) => useQuery(url, propsVariable, options)
}