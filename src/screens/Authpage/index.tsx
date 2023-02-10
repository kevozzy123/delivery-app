import React, { useState } from 'react'
import { TopBar, ToggleBtn } from '@/shared/components'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

const AuthPage = () => {
    const [authState, setAuthState] = useState('')
    return (
        <div>
            <TopBar center={
                <ToggleBtn
                    labels={['Sign Up', 'Sign In']}
                    callback={(e) => setAuthState(e.target.value)}
                ></ToggleBtn>
            } />
            {
                authState === 'Sign Up' ? <LoginPage /> : <SignupPage />
            }
        </div>
    )
}

export default AuthPage