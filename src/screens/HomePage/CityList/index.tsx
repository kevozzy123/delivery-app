import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { zIndexValues, color, sizes, font } from '@/shared/styles/styles'

interface Props {
    showCities: boolean
}
const CityList: React.FC<Props> = ({ showCities = false }) => {
    const [cities, setCities] = useState<{ [key: string]: any }>({})
    const [hotcities, setHotCities] = useState([])

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
                // console.log(data)
            })
    }, [])

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
        <CityWrapper showCities>
            <AnchorWrapper>
                {Anchors}
            </AnchorWrapper>
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
    bottom: ${props => props.showCities ? '0%' : '0%'};
    z-index: ${zIndexValues.modal};
    padding: 1rem;
    overflow: auto;
    transition: .2s ease;
`

const AnchorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 25%;
    height: 0;
    transform: translateX(50%);
`

const HotCityWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: .5rem;
`

const Key = styled.div`
    ${font.bold}
    ${font.size(24)}
`

const City = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid ${color.borderLightest};
`

const NormalCityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
`

const CityBox = styled.div`
    border: 1px solid ${color.borderLight};
    padding: .5rem 1rem;
    text-align: center;
    border-radius: ${sizes.smallBorderRadius};
    &:hover {
        background-color: ${color.backgroundLight};
    }
`

export default CityList