import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useHttp from '@/shared/util/hooks/useApi';
import FullPageFallback from '../Errorpage/FullPageFallback';
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
    ItemName,
    MenuBar,
    MenuBarItem
} from './style';
import { pickRandom, splitStr } from '@/shared/util/javascript';
import TopBar from './TopOptions'
import LoadingSkeleton, { MenuSkeleton } from './LoadingSkeleton';

const RestaurantPage = () => {
    const { id } = useParams();
    const { hash } = useLocation();
    const sectionRefs = useRef<HTMLDivElement[]>([]);
    const [showNav, setShowNav] = useState(false);

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

    useEffect(() => {
        const showNavDetection = function () {
            if (window.scrollY > 550) {
                setShowNav(true)
            } else {
                setShowNav(false)
            }
        }

        window.addEventListener('scroll', showNavDetection)

        return () => {
            window.removeEventListener('scroll', showNavDetection)
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Set the active section to the section that is intersecting the viewport
                        // setActiveSection(entry.target.id);
                        console.log(entry.target.id)
                        // window.history.replaceState(null, "id", `#${entry.target.id}`)
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px' // adjust this based on your requirements
            }
        );

        // Observe all section refs
        sectionRefs.current.forEach(ref => observer.observe(ref));

        return () => {
            // Unobserve all section refs when component is unmounted
            console.log(sectionRefs.current)
            // sectionRefs.current.forEach(ref => observer.unobserve(ref));
        };
    }, [menu]);

    const MenuComp = () => {
        if (isMenuLoading) {
            return <MenuSkeleton />
        }

        return (
            <div style={{ width: '100%' }}>
                <MenuBar showBar={showNav}>
                    <MenuBarItem>分类：</MenuBarItem>
                    {
                        menu && menu.map((section: any) => {
                            return (
                                <MenuBarItem key={section.id} href={'#' + section.id}>
                                    {section.name}
                                </MenuBarItem>
                            )
                        })
                    }
                </MenuBar>
                {menu && menu.map((section: any, index: number) => {
                    return (
                        <MenuSection
                            key={section.id}
                            id={section.id}
                            ref={(el: HTMLDivElement) => (sectionRefs.current[index] = el)}
                        >
                            <h3>{section.name}</h3>
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

    return (
        <PageWrapper>
            <TopBar restaurantInfo={restaurantInfo} />
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
                            <span style={{ marginTop: '2px' }}>{restaurantInfo?.rating}</span>
                            <span style={{ marginTop: '2px' }}> ({restaurantInfo?.rating_count})</span>
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