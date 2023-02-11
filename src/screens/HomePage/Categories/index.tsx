import React from 'react'
import { mixin, font } from '@/shared/styles/styles'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Categories = ({ categories }: { categories: any }) => {
    const navigate = useNavigate()

    return (
        <Wrapper>
            {categories.map((item: any) => {
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
    padding: 0 1rem;
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