import React, { ReactNode } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { font, color } from '@/shared/styles/styles'
import { useNavigate } from 'react-router-dom'
import { RoundButton } from '../Button';

interface Props {
    center?: ReactNode,
    right?: ReactNode,
    transparent?: boolean
}

const TopBar: React.FC<Props> = ({ center, right }, ref) => {
    const navigate = useNavigate()
    return (
        <BarWrapper>
            <RoundButton onClick={() => navigate(-1)}>
                <ArrowIcon />
            </RoundButton>
            <Center>{center}</Center>
            <Right>{right}</Right>
        </BarWrapper>
    )
}

const BarWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    ${font.size(16)}
    ${font.bold}
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    padding: 0 1rem;
    border-bottom: 1px solid ${color.backgroundLightPrimary};
`

const ArrowIcon = styled(ArrowBackIcon)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Center = styled.div`
    ${font.size(24)}
    ${font.bold}
`

const Right = styled.div`
    position: absolute;
    right: 1rem;
`

export default TopBar