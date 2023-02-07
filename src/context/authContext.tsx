import React, { useCallback } from "react";
import * as auth from './authProvider'

interface Authform {
    username: string,
    password: string
}

const assignToken = async () => {
    let user
    const token = auth.getToken()
    if (token) {
        const data = ''
        user = data
    }
    return user
}

const AuthContext = React.createContext(0)