import styled from 'styled-components'
import { font, sizes, color } from '@/shared/styles/styles'
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    margin-top: -60px;
`

export const MenuBar = styled.div<{
    showBar: boolean
}>`
    width: 100%;
    overflow: auto;
    height: fit-content;
    padding: 1rem;
    background-color: white;
    position: ${props => props.showBar ? 'sticky' : 'absolute'};
    top: 0;
    border-bottom: 1px solid ${color.borderLight};
    opacity: ${props => props.showBar ? 1 : 0};
    pointer-events: ${props => props.showBar ? 'auto' : 'none'};
    display: flex;
    align-items: center;
`

interface IMenuBar {

}

export const MenuBarItem = styled.a`
    ${font.bold};
    margin-right: 1.5rem;
    white-space: nowrap;
`

export const Content = styled.div`
    width: 100%;
`

export const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
`

export const Title = styled.h2`
    ${font.size(28)};
    ${font.bold};
`

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: .5rem 0;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: grey;
`

export const Header = styled.header`
    padding: 1rem;
    span{
        margin-right:.5rem;
    }
    div, h2{
        /* margin: .25rem 0; */
    }
`

export const Rating = styled.div`
    display: flex;
    align-items: center;
`

export const Star = styled(StarIcon)`
    font-size: 16px !important;
`

export const Avatar = styled.img`
    position: absolute;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    object-fit: cover;
    left: 1rem;
    bottom: -.5rem;
    box-shadow: 0 0 4px ${color.border};
`

export const FeeWrapper = styled.div`
    width: 100%;
    border-radius: ${sizes.smallBorderRadius};
    border: 1px solid ${color.borderLight};
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 1rem 0;
    &::before {
        content: '';
        width: 1px;
        height: 80%;
        position: absolute;
        background-color: ${color.borderLight};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`

export const FeeItem = styled.div`
    width: 50%;
    height: 100%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    & strong {
        ${font.size(20)}
        ${font.bold}
    };
`

export const Support = styled.div<{
    color: string
}>`
    ${font.size(12)};
    color: ${props => props.color};
`

export const MenuSection = styled.div`
    width: 100%;
    /* padding: 1rem; */
    & h3 {
        ${font.size(28)}
        margin: .25rem 0;
        padding: 1rem;
    }
    & p {
        color: ${color.textMedium}
    }
`

export const ItemName = styled.h4`
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

export const MenuItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 1rem;
    border-bottom: 1px solid ${color.borderLight};
    & div {
        display: flex;
        flex-direction: column;
    }
    & img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: ${sizes.smallBorderRadius};
    }
    & h4{
        ${font.size(20)}
    }
`