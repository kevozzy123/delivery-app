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
            <TopBar center={<span>Sign In</span>} />
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
            </Form>
        </>
    )
}

const Form = styled.form`
    padding: 1rem;
`

export default SignupPage