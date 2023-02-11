import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const index = () => {
    const navigate = useNavigate()

    return (
        <IndexPage>
            <Outlet />
            <BottomNav />
        </IndexPage>
    )
}

const IndexPage = styled.div`

`

const BottomNav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: .5rem 1rem;
`

export default index