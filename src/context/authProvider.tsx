import { User } from '../types/index'
import { notification } from 'antd';

interface AuthInput {
    username: string,
    password: string
}

const apiUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000' : process.env.REACT_APP_API_URL

export const getToken = () => {
    localStorage.getItem('user') ?
        JSON.parse(localStorage.getItem('user') as string).token : undefined
}

export const storeUserInfo = (user: User) => {
    let userString = JSON.stringify(user)
    localStorage.setItem('user', userString)
    return userString
}

export const login = (data: AuthInput) => {
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

export const register = (data: AuthInput) => {
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

export const logout = async () => {
    localStorage.removeItem('user')
    notification.open({
        message: 'You have been logged out'
    });
}

const authProvider = () => {
    return (
        <div>authProvider</div>
    )
}

export default authProvider