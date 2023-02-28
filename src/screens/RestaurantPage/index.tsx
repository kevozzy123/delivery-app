import React, { useEffect, useState, useCallback, useTransition } from 'react'
import { useParams } from 'react-router-dom'
import { getImgPath } from '@/shared/util/image'
import useHttp from '@/shared/util/hooks/useApi'
import FullPageFallback from '../Errorpage/FullPageFallback'
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
    Avatar,
    ItemName
} from './style'
import { pickRandom, splitStr } from '@/shared/util/javascript';
import TopBar from './TopOptions'
import LoadingSkeleton from './LoadingSkeleton';

const RestaurantPage = () => {
    const { id } = useParams()
    const [{
        data: restaurantInfo,
        isLoading: isResLoading,
        error: resError
    }] = useHttp.get('/shopping/restaurant/' + id)

    const [{
        data: menu,
        isLoading: isMenuLoading,
        error: menuError
    }] = useHttp.get('/shopping/v2/menu', {
        restaurant_id: id
    })

    const MenuComp = () => {
        if (isMenuLoading) {
            return <div>Loading...</div>
        }

        return (
            <div style={{ width: '100%' }}>
                {menu && menu.map((section: any) => {
                    return (
                        <MenuSection key={section.id}>
                            <h3>{section.name}</h3>
                            <p>{section.description}</p>
                            {
                                section.foods.map((item: any) => {
                                    return (
                                        <MenuItem key={item._id}>
                                            <div>
                                                <ItemName>{item.name}</ItemName>
                                                <p>descipriton: {item.description}</p>
                                                <p style={{ marginTop: 'auto' }}>{item.tips}</p>
                                            </div>
                                            <img onError={onImgError} src={`/img/${pickRandom(1, 18)}.jpg`} alt="food item" />
                                        </MenuItem>
                                    )
                                })
                            }
                        </MenuSection>
                    )
                })}
            </div>
        )
    }

    const onImgError = function (e: React.SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = `/img/${pickRandom(1, 18)}.jpg`
    }

    if (isResLoading) {
        return <LoadingSkeleton />
    }

    if (resError || menuError) {
        return <FullPageFallback />
    }

    // if (true) {
    //     return (
    //         <LoadingSkeleton />
    //     )
    // }

    return (
        <PageWrapper>
            <TopBar />
            {restaurantInfo &&
                <Content>
                    <ImgContainer>
                        <Img src={(`/img/${pickRandom(1, 18)}.jpg`)} />
                        <Avatar src={'//elm.cangdu.org/img/' + restaurantInfo.image_path} />
                    </ImgContainer>
                    <Header>
                        <Title>{restaurantInfo?.name}</Title>
                        {splitStr(restaurantInfo?.category, ',').map(item => {
                            return (
                                <span key={item}>{item}</span>
                            )
                        })}
                        <FlexWrapper>
                            <Rating>
                                {Array.from(Array(5).keys()).map((num: number) => {
                                    return (
                                        <Star key={num} />
                                    )
                                })}
                            </Rating>
                            <span>{restaurantInfo?.rating}</span>
                            <span> ({restaurantInfo?.rating_count})</span>
                        </FlexWrapper>
                        <FlexWrapper>
                            <span> {splitStr(restaurantInfo?.opening_hours[0], '/')[0]} -</span>
                            <span> {splitStr(restaurantInfo?.opening_hours[0], '/')[1]}</span>
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
                                    <Support key={item.id} color={'#' + item.icon_color}>
                                        {item.description}
                                    </Support>
                                )
                            })}
                        </div>
                    </Header>
                    <MenuComp />
                </Content>}
        </PageWrapper>
    )
}

export default RestaurantPage