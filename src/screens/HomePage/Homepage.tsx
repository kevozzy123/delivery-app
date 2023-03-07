import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from './Categories';
import SubList from './SubList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CityList from './CityList';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import useHttp from '@/shared/util/hooks/useApi';
import { useSelector } from 'react-redux';
import { RootStore } from '@/shared/store';
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
import {
    LoadingIcon,
    PageWrapper,
    TopBar,
    List,
    TitleLarge,
    ListItem,
    Img,
    InfoWrapper,
    Title,
    InfoItem,
    Rating,
    Support,
    FilterOptionsWrapper,
    FilterButton
} from './homeStyle';
import SearchedItems from './SearchedItems/SearchedItems';

const Homepage = () => {
    const navigate = useNavigate();
    const longitude = useSelector<RootStore, number | null>(state => state.location.longitude);
    const latitude = useSelector<RootStore, number | null>(state => state.location.latitude);
    const [showResults, setShowResults] = useState(false);
    const [showCities, setShowCities] = useState(false);

    const [{
        data: list,
        isLoading: isListLoading,
        error: listError
    }, getList] = useHttp.get('/shopping/restaurants', {
        latitude: latitude || 31.22967,
        longitude: longitude || 121.4762,
        limit: 20
    });

    const [{
        data: searchResult,
        isLoading: isSearchLoading,
        error: searchError
    }, getSearchList] = useHttp.get('/shopping/restaurants?search=true', {}, { lazy: true });

    const [{
        data: restaurentList,
        error: restaurentError,
        isLoading: isResLoading
    }, getRestaurants] = useHttp.get('/shopping/v2/restaurant/category');

    const [{
        data: categories,
        isLoading: isCategoryLoading,
        error: cateError
    }] = useHttp.get('/v2/index_entry')

    const searchByCategory = (
        id?: number,
        deliver_mode?: number[],
        order_by?: number,
        support_ids?: number[],
    ) => {
        getSearchList({
            latitude: latitude || 31.22967,
            longitude: longitude || 121.4762,
            limit: 20,
            restaurant_category_id: id,
            deliver_mode: deliver_mode,
            order_by: order_by,
            support_ids: support_ids
        })
    }

    // if any error happens, fallback the entire page to error page
    if (listError || cateError || restaurentError) {
        return <div>Full page error</div>
    }

    if (isCategoryLoading || isResLoading || isListLoading) {
        return <LoadingIcon />
    }

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
            <Categories categories={categories} isLoading={isCategoryLoading} />

            <FilterOptionsWrapper>

            </FilterOptionsWrapper>

            <SearchedItems
                data={searchResult}
                error={searchError}
                isLoading={isSearchLoading}
                showResults={showResults}
            />
            {
                isResLoading ? <div>loading...</div> : restaurentList.map((restaurant: any) => {
                    return (
                        <div key={restaurant.id}>
                            <SubList list={restaurant} />
                        </div>
                    )
                })}
            <List>
                <TitleLarge>More Options</TitleLarge>
                {
                    isListLoading ? <div>loading...</div>
                        : list.map((item: any) => {
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
            </List>
            <CityList showCities={showCities} closeShowCities={() => setShowCities(false)} />
        </PageWrapper>
    )
}

interface HighScore {
    highScore: boolean
}

export const Star = styled(({ highScore, ...props }) => {
    return <StarIcon {...props} />
}
) <HighScore>
    `
    margin: 0 2px;
    color: ${props => props.highScore ? '#faad14' : 'inherit'};
`

export default Homepage