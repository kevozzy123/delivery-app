import styled from "styled-components";
import { color, font, sizes, zIndexValues, mixin } from '@/shared/styles/styles';

import CircularProgress from '@mui/material/CircularProgress';

export const PageWrapper = styled.main`
    
`

export const LoadingIcon = styled(CircularProgress)`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const TopBar = styled.div`
    background-color: white;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    top: 0;
    z-index: ${zIndexValues.navTop};
    padding: 0 1rem;
    ${font.size(22)};
    ${font.bold};
    background-color: white;
    border-bottom: 1px solid ${color.backgroundLight};
`

export const FilterOptionsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const FilterButton = styled.button`
    border-radius: ${sizes.buttonBorderRadius};
    background-color: ${color.backgroundLight};
`

export const List = styled.ul`
    margin: 1rem;
`

export const ListItem = styled.li`
    margin: 2rem 0;
    position: relative;
    &::before{
        content: '';
        width: calc(100% + 2rem);
        height: 1px;
        background-color: ${color.borderLight};
        position: absolute;
        bottom: -1rem;
        left: -1rem;
    }
`

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.h4`
    display: flex;
    align-items: center;
    margin: .5rem 0;
    ${mixin.truncateText}
`

export const TitleLarge = styled.h3`
    ${font.size(24)}
    ${font.bold}
    margin-bottom: -1rem;
`

export const InfoItem = styled.div<{ justifyContent?: boolean }>`
    color: ${color.textMedium};
    display: flex;
    justify-content: ${props => props.justifyContent ? 'space-between' : 'start'};
    align-items: center;
`

InfoItem.defaultProps = {
    justifyContent: true
}

interface HighScore {
    highScore: boolean
}

export const Rating = styled.div<HighScore>`
    display: flex;
    align-items: center;
    color: ${props => props.highScore ? 'black' : 'inherit'};
`



export const Support = styled.span`
    margin-right: .5rem;
    padding: 2px 6px;
    color: ${color.textLink};
    ${font.bold}
    background-color: ${color.backgroundLightPrimary};
    border-radius: ${sizes.smallBorderRadius};
    margin-top: 8px;
`

export const Img = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: ${sizes.smallBorderRadius};
`