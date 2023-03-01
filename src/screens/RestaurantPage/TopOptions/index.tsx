import React, { useCallback } from 'react'
import { RoundButton } from '@/shared/components/Button'
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { shareContent } from '@/shared/util/javascript';
import styled from 'styled-components';
import zIndex from '@mui/material/styles/zIndex';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface IProps {
    restaurantInfo: any
}

const TopBar = ({ restaurantInfo }: IProps) => {
    const navigate = useNavigate();

    const Options = () => {
        return (
            <OptionsWrapper>
                <Button onClick={saveRestaurant} style={{ marginRight: '.5rem' }}>
                    <FavoriteBorderIcon style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }} />
                </Button>
                <Button onClick={() => shareContent('hi', '111')}>
                    <IosShareIcon style={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '20px'
                    }} />
                </Button>
            </OptionsWrapper>
        )
    }

    const saveRestaurant = () => {
        // const savedList = localStorage.getItem('saved')
        // let obj: {[key: string]: any} = {};
        // if (!savedList) {
        //     obj[restaurantInfo.name] = restaurantInfo
        // } else {
        //     obj = JSON.parse(savedList)
        // }
        console.log(111)
    };

    return (
        <Wrapper>
            <Button onClick={() => navigate(-1)}>
                <ArrowBackIcon style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }} />
            </Button>
            <Options />
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

const Button = styled(RoundButton)`
    position: relative;
    left: 0;
`

const OptionsWrapper = styled.div`
    height: fit-content;

    display: flex;
`

export default React.memo(TopBar)