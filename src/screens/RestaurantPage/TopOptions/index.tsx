import React, { useCallback } from 'react'
import { RoundButton } from '@/shared/components/Button'
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { shareContent } from '@/shared/util/javascript';
import styled from 'styled-components';
import zIndex from '@mui/material/styles/zIndex';

const TopBar = () => {
    const options = useCallback(() => {
        return (
            <div>
                <RoundButton onClick={saveRestaurant}>
                    <FavoriteBorderIcon />
                </RoundButton>
                <RoundButton onClick={() => shareContent('hi', '111')}>
                    <IosShareIcon />
                </RoundButton>
            </div>
        )
    }, [])

    const saveRestaurant = () => {

    }
    return (
        <Wrapper>
            <RoundButton>22</RoundButton>
            {options()}
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
    position: absolute;
    width: 100%;
    height: 50px;
    padding: 1rem;
    z-index: ${zIndex.appBar};
`
export default TopBar