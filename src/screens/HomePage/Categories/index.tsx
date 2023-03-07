import React from 'react'
import { mixin, font, color } from '@/shared/styles/styles'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Categories = ({ categories, isLoading }:
    { categories: any, isLoading: boolean }) => {
    const navigate = useNavigate()

    if (isLoading) {
        return (
            <Wrapper>
                <div>hhh</div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {categories && categories.map((item: any) => {
                return (
                    <Item key={item.id}
                        onClick={() => navigate('/categories/' + item.id)}
                    >
                        <Img
                            src={'https://fuss10.elemecdn.com' + item.image_url}
                            alt="category thumbnail"
                        />
                        <span style={{ whiteSpace: 'nowrap', marginTop: '.5rem' }}>
                            {item.title}
                        </span>
                    </Item>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.section`
    ${mixin.scrollableX}
    display: flex;
    align-items: center;
    padding: 1rem 1rem 2rem;
    position: relative;
     /* &::before {
        height: 8px;
        width: 100%;
        content: '';
        background-color: ${color.backgroundLight};
        border-top: 1px solid ${color.borderLight};
        border-bottom: 1px solid ${color.borderLight};
        position: absolute;
        display: block;
        bottom: 0rem;
        left: 0;
        right: 0;
    } */
`

const Img = styled.img`
    width: 60px;
    height: 60px;
`

const Item = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
    height: fit-content;
    ${font.size(16)}
`
export default Categories