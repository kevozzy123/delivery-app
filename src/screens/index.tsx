import React from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { color, font, zIndexValues } from '@/shared/styles/styles'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';

const index = () => {
    const navigate = useNavigate()

    let activeStyle = {
        textDecoration: "underline",
        color: 'red'
    };

    const activeLink = ({ isActive }: { isActive: boolean }) => {
        isActive ? activeStyle : undefined
    }

    return (
        <IndexPage>
            <Outlet />
            <BottomNav>
                <NavItem to='/' style={({ isActive }: any) =>
                    isActive ? activeStyle : undefined
                }>
                    <HomeIcon />
                    Home
                </NavItem>
                <NavItem to='/' style={{ color: 'lightgray' }}>
                    <HelpIcon />
                    Unfinished
                </NavItem>
                <NavItem to='/' style={({ isActive }: any) =>
                    isActive ? activeStyle : undefined
                }>
                    <SearchIcon />
                    Search
                </NavItem>
                <NavItem to='/unfinished' style={{ color: 'lightgray' }}>
                    <HelpIcon />
                    Unfinished
                </NavItem>
                <NavItem to='/account' style={({ isActive }: { isActive: boolean }) =>
                    isActive ? activeStyle : undefined
                }>
                    <AccountCircleIcon />
                    Account
                </NavItem>
            </BottomNav>
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
    padding: 1rem;
    background-color: white;
    border-top: 1px solid ${color.borderLight};
    z-index: ${zIndexValues.navTop};
`

const NavItem = styled(NavLink) <{ isActive?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${font.size(16)};
    `
/* color: ${({ isActive }) => {
    return isActive ? 'black' : color.textMedium
}} */

export default index