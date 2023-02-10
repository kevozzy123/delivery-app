import React, { ReactNode } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { font, color } from '@/shared/styles/styles'
import { useNavigate } from 'react-router-dom'

interface NamedSlots {

}

interface Props {
    center?: ReactNode,
    right?: ReactNode
}

const TopBar: React.FC<Props> = ({ center, right }, ref) => {
    const navigate = useNavigate()
    return (
        <BarWrapper>
            <BackBtn onClick={() => navigate(-1)}>
                <ArrowIcon />
            </BackBtn>
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
    padding: 0 1rem;
    border-bottom: 1px solid ${color.backgroundLightPrimary};
`

const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    position: absolute;
    left: 1rem;
    background-color: white;
    border-radius: 50%;
    ${font.bold};
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