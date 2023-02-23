import React, { ReactNode, useCallback, useContext, useState } from "react";
import { User } from '../types/index'

interface AuthInput {
    username: string,
    password: string
}

const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000' : process.env.REACT_APP_API_URL

export const getToken = () => {
    return localStorage.getItem('user') ?
        JSON.parse(localStorage.getItem('user') as string).token : undefined
}

export const storeUserInfo = (user: User) => {
    let userString = JSON.stringify(user)
    localStorage.setItem('user', userString)
    return user
}

export const _login = (data: AuthInput) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return storeUserInfo(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
}

export const _register = (data: AuthInput) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return storeUserInfo(await response.json());
        } else {
            return Promise.reject(await response.json());
        }
    });
}

export const _logout = async () => {
    localStorage.removeItem('user')
    // notification.open({
    //     message: 'You have been logged out'
    // });
}

const assignToken = async () => {
    let user
    const token = getToken()
    if (token) {
        const data = ''
        user = data
    }
    return user
}

const AuthContext = React.createContext<
    {
        user: User | null,
        register: (form: AuthInput) => Promise<void>,
        login: (form: AuthInput) => Promise<void>,
        logout: () => Promise<void>
    } | undefined
>(undefined);



export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    // const {} = useAsync()
    const login = (form: AuthInput) => _login(form).then((value) => setUser(value))
    const register = (form: AuthInput) => _register(form).then(setUser)
    const logout = () => _logout().then(() => setUser(null))
    return (
        <AuthContext.Provider
            children={children}
            value={{ user, register, login, logout }}
        />
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    return context
}