import axios, { AxiosError } from "axios";
import history from "@/browserHistory"
import { getToken } from "../context/authContext";

const defaults = {
    baseUrl: 'https://elm.cangdu.org',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": getToken() ? 'Bearer ' + getToken() : undefined
    },
    error: {
        code: 'BAD_CONNECTION',
        message: 'Oops! It seems your connection is unstable. Please try again.'
    }
}

const api = <V>(method: string, url: string, variables: V) => {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url: `${defaults.baseUrl}${url}`,
            data: method.toLowerCase() !== 'get' ? variables : undefined,
            params: method.toLowerCase() === 'get' ? variables : undefined,
            // paramsSerializer: 
        })
            .then((res) => {
                if (res.data.status === 0) {
                    reject(res.data)
                }
                resolve(res.data)
            })
            .catch((error: AxiosError<any>) => {
                if (error.response) {
                    if (error.response.data.error.code === 'invalidToken') {
                        history.push('/login')
                    } else {
                        reject(error.response.data.error)
                    }
                } else {
                    reject(defaults.error)
                }
            })
    })
}

const methods = {
    get: <V>(url: string, variables: V) => api('get', url, variables),
    post: <V>(url: string, variables: V) => api('post', url, variables),
    put: <V>(url: string, variables: V) => api('put', url, variables),
    delete: <V>(url: string, variables: V) => api('delete', url, variables),
    patch: <V>(url: string, variables: V) => api('patch', url, variables),
}

export default methods
