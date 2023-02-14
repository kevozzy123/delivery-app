import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { color, font, sizes, zIndexValues, mixin } from '@/shared/styles/styles'
import StarIcon from '@mui/icons-material/Star';
import Categories from './Categories';
import SubList from './SubList';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CityList from './CityList';

const Homepage = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [categories, setCategories] = useState([])
    const [restaurentList, setRestaurantList] = useState([])
    const [showCities, setShowCities] = useState(false)

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
                setRestaurantList(data)
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
            <TopBar>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>251 crabtree ct</span>
                    <KeyboardArrowDownIcon />
                </div>
                <LocationOnIcon
                    style={{ fontSize: '24px', cursor: 'pointer' }}
                    onClick={() => setShowCities(true)}
                />
            </TopBar>
            <Categories categories={categories} />
            {restaurentList.map((restaurant: any) => {
                return (
                    <div key={restaurant.id}>
                        <SubList list={restaurant} />
                    </div>
                )
            })}
            <List>
                <TitleLarge>More Options</TitleLarge>
                {
                    list.map((item: any) => {
                        return (
                            <ListItem key={item.id}>
                                <Img
                                    onClick={() => {
                                        console.log(111)
                                        navigate('/restaurant/' + item.id)
                                    }}
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
            </List>
            <CityList showCities={showCities} closeShowCities={() => setShowCities(false)} />
        </PageWrapper>
    )
}

const PageWrapper = styled.main`

`

const TopBar = styled.div`
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

const List = styled.ul`
    margin: 1rem;
`

const ListItem = styled.li`
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

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h4`
    display: flex;
    align-items: center;
    margin: .5rem 0;
    ${mixin.truncateText}
`

const TitleLarge = styled.h3`
    ${font.size(24)}
    ${font.bold}
    margin-bottom: -1rem;
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