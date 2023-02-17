import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { zIndexValues, color, sizes, font } from '@/shared/styles/styles'
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '@/shared/store';
import { setLocation, clearSearchHistory, Location } from '@/shared/store/locationSlice'

interface Props {
    showCities: boolean,
    closeShowCities: () => void
}
const CityList: React.FC<Props> =
    ({ showCities = false, closeShowCities }) => {
        const [cities, setCities] = useState<{ [key: string]: any }>({})
        const [hotcities, setHotCities] = useState([])
        const [input, setInput] = useState('')
        const [cityOnlyList, setCityOnlyList] = useState<any[]>([])
        const [filtered, setFiltered] = useState<any[]>([])
        const recentSearches = useSelector<RootStore, Location[]>(state => state.location.recentSearches)
        const dispatch = useDispatch()

        useEffect(() => {
            fetch('https://elm.cangdu.org/v1/cities?type=group', {
                method: 'GET'
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    setCities(data)
                    let flattened = Object.keys(data).map((key: string) => {
                        return data[key]
                    }).flat(2)
                    setCityOnlyList(flattened)
                })

            fetch('https://elm.cangdu.org/v1/cities?type=hot', {
                method: 'GET'
            }).then(res => res.json())
                .then(data => {
                    setHotCities(data)
                })
        }, [])

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value
            setInput(value)
            let arr = cityOnlyList.filter((city: any) => {
                return city.name.includes(value) || city.pinyin.includes(value)
            })
            setFiltered(arr)
        }

        const onCityClick = (item: any) => {
            dispatch(setLocation(item))
        }

        const Anchors = Object.keys(cities).sort().map((key: string) => {
            return (
                <a href={`#${key}`} key={key}>{key}</a>
            )
        })

        const Cities = Object.keys(cities).sort().map((key: string) => {
            return (
                <NormalCityWrapper key={key}>
                    <Key id={key}>{key}</Key>
                    <div>
                        {cities[key].map((item: any) => {
                            return <City key={item.id} onClick={() => onCityClick(item)}>{item.name}</City>
                        })}
                    </div>
                </NormalCityWrapper>
            )
        })

        return (
            <CityWrapper showCities={showCities}>
                <SearchBar>
                    <Close onClick={closeShowCities} />
                    <SearchInput
                        value={input}
                        onChange={onInputChange}
                        placeholder='search a city'
                    />
                </SearchBar>
                {
                    input ?
                        <div>
                            {filtered.map((item: any) => {
                                return (
                                    <ResultItem>
                                        <LocationOnIcon style={{ marginRight: '1rem' }} />
                                        <span onClick={() => onCityClick(item)}>{item.name}</span>
                                    </ResultItem>
                                )
                            })}
                        </div>
                        :
                        <>
                            {
                                recentSearches.length !== 0 &&
                                <>
                                    <Key>Recent Searches:</Key>
                                    <HotCityWrapper>
                                        {recentSearches.map((item: any) => {
                                            return (
                                                <CityBox key={item} onClick={() => onCityClick(item)}>{item}</CityBox>
                                            )
                                        })}
                                    </HotCityWrapper>
                                </>
                            }
                            <AnchorWrapper>
                                {Anchors}
                            </AnchorWrapper>
                            <Key>Hot Cities:</Key>
                            <HotCityWrapper>
                                {hotcities.map((item: any) => {
                                    return (
                                        <CityBox key={item.id} onClick={() => onCityClick(item)}>{item.name}</CityBox>
                                    )
                                })}
                            </HotCityWrapper>
                            {Cities}
                        </>}
            </CityWrapper>
        )
    }

const CityWrapper = styled.section<{
    showCities: boolean
}>`
    position: fixed;
    transform: translateY(0);
    background-color: white;
    height: 100vh;
    width: 100vw;
    left: 0;
    bottom: ${props => props.showCities ? '0%' : '-100%'};
    z-index: ${zIndexValues.modal};
    padding: 0 2rem 0 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    transition: .2s ease;
`

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${color.backgroundLight};
    position: sticky;
    top: 0;
    transform: translateX(-1rem);
    width: 100vw;
    padding: 1rem;
`

const SearchInput = styled.input`
    background-color: white;
    border-radius: 1rem;
    border: none;
    ${font.size(16)}
    padding: .5rem .5rem .5rem 1rem;
    flex: 1;
`

const Close = styled(CloseIcon)`
    margin-right: 1rem;
`

const AnchorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 25%;
    height: 0;
    transform: translateX(55%);
`

const HotCityWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, [col-start] minmax(0px, 1fr) [col-end]);
    gap: .5rem;
`

const Key = styled.div`
    ${font.bold}
    ${font.size(24)}
    margin: 1rem 0 .5rem;
`

const City = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid ${color.borderLightest};
`

const NormalCityWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const CityBox = styled.div`
    border: 1px solid ${color.borderLight};
    padding: .5rem;
    text-align: center;
    white-space: nowrap;
    border-radius: ${sizes.smallBorderRadius};
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        background-color: ${color.backgroundLight};
    }
`

const ResultItem = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 0;
    position: relative;
    &::before {
        content: '';
        height: 1px;
        width: 100%;
        background-color: ${color.borderLightest};
        position: absolute;
        bottom: 0;
    }
`

export default CityList