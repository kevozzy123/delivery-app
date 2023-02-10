import React, { useState } from 'react'
import { TopBar, ToggleBtn } from '@/shared/components'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div>
            <TopBar center={<ToggleBtn labels={['Sign Up', 'Sign In']}></ToggleBtn>} />
            {
                isLogin ? <LoginPage /> : <SignupPage />
            }
        </div>
    )
}

export default AuthPage