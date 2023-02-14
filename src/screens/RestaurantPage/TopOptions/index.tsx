import React, { useCallback } from 'react'
import { RoundButton } from '@/shared/components/Button'
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { shareContent } from '@/shared/util/javascript';
import styled from 'styled-components';

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

        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    
`
export default TopBar