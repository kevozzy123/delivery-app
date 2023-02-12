import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { zIndexValues, color, sizes, font } from '@/shared/styles/styles'
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    showCities: boolean,
    closeShowCities: () => void
}
const CityList: React.FC<Props> = ({ showCities = false, closeShowCities }) => {
    const [cities, setCities] = useState<{ [key: string]: any }>({})
    const [hotcities, setHotCities] = useState([])
    const [input, setInput] = useState('')
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        fetch('https://elm.cangdu.org/v1/cities?type=group', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setCities(data)
            }).then(() => {
                let c = Object.keys(cities).map((key: string) => {
                    return (cities[key])
                })
            })

        fetch('https://elm.cangdu.org/v1/cities?type=hot', {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                setHotCities(data)
            })
    }, [])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        console.log(cities)
        // let arr = cities.filter((city: string) => {
        //     return city.includes(e.target.value)
        // })
        // setFiltered(arr)
        // console.log(arr)
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
                        return <City key={item.id}>{item.name}</City>
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
            <Key>Recent Searches:</Key>
            <HotCityWrapper>
                {hotcities.map((item: any) => {
                    return (
                        <CityBox key={item.id}>{item.name}</CityBox>
                    )
                })}
            </HotCityWrapper>
            <AnchorWrapper>
                {Anchors}
            </AnchorWrapper>
            <Key>Hot Cities:</Key>
            <HotCityWrapper>
                {hotcities.map((item: any) => {
                    return (
                        <CityBox key={item.id}>{item.name}</CityBox>
                    )
                })}
            </HotCityWrapper>
            {Cities}
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
    overflow: auto;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    padding: .5rem 1rem;
    text-align: center;
    white-space: nowrap;
    border-radius: ${sizes.smallBorderRadius};
    &:hover {
        background-color: ${color.backgroundLight};
    }
`

export default CityList