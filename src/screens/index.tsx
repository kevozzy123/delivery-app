import React from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { color, font, zIndexValues } from '@/shared/styles/styles'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GradeIcon from '@mui/icons-material/Grade';

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
                <NavItem to='/'>
                    <HomeIcon />
                    Home
                </NavItem>
                <NavItem to='/saved'>
                    <GradeIcon />
                    Saved
                </NavItem>
                <NavItem to='/search'>
                    <SearchIcon />
                    Search
                </NavItem>
                <NavItem to='/cart'>
                    <ShoppingCartIcon />
                    Cart
                </NavItem>
                <NavItem to='/account'>
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
    padding: .5rem;
    background-color: white;
    border-top: 1px solid ${color.borderLight};
    z-index: ${zIndexValues.navTop};
`

const NavItem = styled(NavLink) <{ isActive?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${font.size(16)};
    &.active {
        color: ${color.backgroundMedium};
    }
`

export default index