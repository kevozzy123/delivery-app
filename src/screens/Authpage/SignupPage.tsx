import React, { FormEvent, useState } from 'react'
import { Button, Input, TopBar } from '@/shared/components/index'
import styled from 'styled-components'

const SignupPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username && !password) {
            setUsernameErr(true)
            setPasswordErr(true)
            return
        }
        if (!username) {
            setUsernameErr(true)
            return
        }
        if (!password) {
            setPasswordErr(true)
            return
        }

        console.log(username, password)
    }

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setUsername(e.target.value)
        setUsernameErr(false)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setPassword(e.target.value)
        setPasswordErr(false)
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input
                    id='email' label='Email'
                    showErr={usernameErr}
                    errorMsg='Username is Required'
                    onChange={onUsernameChange}
                    placeholder="Enter your Email"
                />
                <Input
                    id='password' label='Passowrd'
                    showErr={passwordErr}
                    errorMsg='Password is Required'
                    onChange={onPasswordChange}
                    type="password"
                    placeholder="Enter your Password"
                />
                <Button variant='default' empty>Sign Up</Button>
                {/* <ToggleButton></ToggleButton> */}
                <p style={{ color: 'red', textAlign: 'initial' }}>For the purpose of demonstration,
                    unregistered users will be automatically if they attempt to sign in.
                    Therefore, you can directly sign in without a prior account and this sign in page is for presentation only.</p>
            </Form>
        </>
    )
}

const Form = styled.form`
    padding: 1rem;
`

export default SignupPage