import React, { useEffect, useState, useCallback, useTransition } from 'react'
import { useParams } from 'react-router-dom'
import { getImgPath } from '@/shared/util/image'
import {
    PageWrapper,
    Content,
    ImgContainer,
    Img,
    Header,
    FlexWrapper,
    Title,
    Rating,
    Star,
    FeeWrapper,
    FeeItem,
    Support,
    MenuSection,
    MenuItem,
    Avatar
} from './style'
import { pickRandom, splitStr } from '@/shared/util/javascript';

import TopBar from './TopOptions'


const RestaurantPage = () => {
    const { id } = useParams()
    const [restaurantInfo, setRestaurantInfo] = useState<any | null>(null)
    const [menu, setMenu] = useState([])
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition(() => {
            fetch('https://elm.cangdu.org/shopping/restaurant/' + id, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    setRestaurantInfo(data)
                    console.log(data)
                });
        });

        startTransition(() => {
            fetch('https://elm.cangdu.org/shopping/v2/menu?restaurant_id=' + id, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(data => {
                    setMenu(data)
                    console.log(data)
                });
        });
    }, [])


    if (isPending) {
        return <div>Loading...</div>;
    }

    return (
        <PageWrapper>
            <TopBar />
            {restaurantInfo && <Content>
                <ImgContainer>
                    <Img src={(`/img/${pickRandom(1, 18)}.jpg`)} />
                    <Avatar src={'//elm.cangdu.org/img/' + restaurantInfo.image_path} />
                </ImgContainer>
                <Header>
                    <Title>{restaurantInfo?.name}</Title>
                    {splitStr(restaurantInfo?.category, ',').map(item => {
                        return (
                            <span>{item}</span>
                        )
                    })}
                    <FlexWrapper>
                        <Rating>
                            {Array.from(Array(5).keys()).map((num: number) => {
                                return (
                                    <Star />
                                )
                            })}
                        </Rating>
                        <span>{restaurantInfo?.rating}</span>
                        <span> ({restaurantInfo?.rating_count})</span>
                    </FlexWrapper>
                    <FlexWrapper>
                        {splitStr(restaurantInfo?.opening_hours[0], '/')[1]}
                    </FlexWrapper>
                    <FeeWrapper>
                        <FeeItem>
                            <strong>¥{restaurantInfo.float_delivery_fee}.00</strong>
                            <div>delivery fee</div>
                        </FeeItem>
                        <FeeItem>
                            <strong>¥{restaurantInfo.float_minimum_order_amount}.00</strong>
                            <div>mininum order</div>
                        </FeeItem>
                    </FeeWrapper>
                    <div style={{ margin: '1rem 0' }}>
                        {restaurantInfo.supports.map((item: any) => {
                            return (
                                <Support color={'#' + item.icon_color}>
                                    {item.description}
                                </Support>
                            )
                        })}
                    </div>
                </Header>
                <div>
                    {menu.map((section: any) => {
                        return (
                            <MenuSection>
                                <h3>{section.name}</h3>
                                <p>{section.description}</p>
                                {section.foods.map((item: any) => {
                                    return (
                                        <MenuItem>
                                            <div>
                                                <h4> {item.name}</h4>
                                                <p>{item.tips}</p>
                                            </div>

                                            <img src={'//elm.cangdu.org/img/' + item.image_path} alt="" />
                                        </MenuItem>
                                    )
                                })}
                            </MenuSection>
                        )
                    })}
                </div>
            </Content>}
        </PageWrapper>
    )
}

export default RestaurantPage