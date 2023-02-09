import React, { FormEvent } from 'react'
import { Button, Input } from '@/shared/components/index'
import styled from 'styled-components'

const LoginPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Button variant='default' empty onClick={() => console.log(111)}>Login</Button>
            <Input />
        </Form>
    )
}

const Form = styled.form`
    padding: 1rem;

`

export default LoginPage