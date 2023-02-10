import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TopBar } from '@/shared/components';
import { color, font, sizes } from '@/shared/styles/styles'
import StarIcon from '@mui/icons-material/Star';
import Categories from './Categories';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const Homepage = () => {
    const [list, setList] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762&limit=30', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                setList(data)
            })


        fetch('https://elm.cangdu.org/shopping/v2/restaurant/category', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                // setCategories(data)
                console.log(data)
            })

        fetch('https://elm.cangdu.org/v2/index_entry', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])
    return (
        <PageWrapper>
            <Categories categories={categories} />
            <ul>
                {
                    list.map((item: any) => {
                        return (
                            <ListItem key={item.id}>
                                <Img src={'//elm.cangdu.org/img/' + item.image_path} alt="thumbnail" />
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
            </ul>
        </PageWrapper>
    )
}

const PageWrapper = styled.main`
    padding: 0 1rem;
`

const ListItem = styled.li`
    margin: 1.5rem 0;
    &::before{
        content: '';
        width: 100%;
        height: 2px;
        color: black;
    }
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h4`
    display: flex;
    align-items: center;
    margin: .5rem 0;
`

const InfoItem = styled.div<{ justifyContent?: boolean }>`
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

const Rating = styled.div<HighScore>`
    display: flex;
    align-items: center;
    color: ${props => props.highScore ? 'black' : 'inherit'};
`

const Star = styled(({ highScore, ...props }) => (<StarIcon {...props} />)) <HighScore>`
    margin: 0 2px;
    color: ${props => props.highScore ? '#faad14' : 'inherit'};
`

const Support = styled.span`
    margin-right: .5rem;
    padding: 2px 6px;
    color: ${color.textLink};
    ${font.bold}
    background-color: ${color.backgroundLightPrimary};
    border-radius: ${sizes.smallBorderRadius};
    margin-top: 8px;
`

const Img = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: ${sizes.smallBorderRadius};
`
export default Homepage