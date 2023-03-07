import React from 'react'
import { MenuSkeleton } from '@/screens/RestaurantPage/LoadingSkeleton'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {
    ListItem,
    Img,
    InfoItem,
    Title,
    InfoWrapper,
    Rating,
    Support
} from '../homeStyle';
import { Star } from '../Homepage';

interface IProps {
    data: any[],
    error: any,
    isLoading: boolean,
    showResults: boolean
}

const SearchedItems = ({
    data,
    error,
    isLoading,
    showResults
}: IProps) => {
    const navigate = useNavigate();

    if (!showResults) {
        return <></>
    }
    if (isLoading) {
        return <MenuSkeleton />
    }

    return (
        <Container>
            {
                data && data.map((item: any) => {
                    return (
                        <ListItem key={item.id}>
                            <Img
                                onClick={() => { navigate('/restaurant/' + item.id) }}
                                src={'//elm.cangdu.org/img/' + item.image_path}
                                alt="thumbnail" />
                            <InfoWrapper>
                                <Title>
                                    <LocalDiningIcon />{item.name}
                                </Title>
                                <InfoItem>
                                    <p>{item.category}</p>
                                    <p>{item.distance}</p>
                                </InfoItem>
                                <InfoItem>
                                    <p>Minimum price: ¥{item.float_minimum_order_amount}</p>
                                    <p>{item.order_lead_time}</p>
                                </InfoItem>
                                <InfoItem>
                                    <Rating highScore={item.rating > 4.5}>
                                        {item.rating}
                                        <Star highScore={item.rating > 4.5} style={{ fontSize: '18px' }} />
                                        <span>({item.rating_count})</span>
                                    </Rating>
                                    <p>¥{item.float_delivery_fee} delivery fee</p>
                                </InfoItem>
                                <InfoItem justifyContent={false}>
                                    {item.supports?.map((supp: any, index: number) => {
                                        return (
                                            <Support key={supp.id}>
                                                {supp.name}
                                            </Support>
                                        )
                                    })}
                                </InfoItem>
                            </InfoWrapper>
                        </ListItem>
                    )
                })
            }
        </Container>
    )
}

const Container = styled.section`
    
`

export default SearchedItems