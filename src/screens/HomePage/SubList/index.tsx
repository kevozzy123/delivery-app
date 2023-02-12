import React from 'react'
import styled from 'styled-components'
import { font, mixin, color, sizes } from '@/shared/styles/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Skeleton } from '@mui/material';

const SubList: React.FC<{ list: any }> = ({ list }) => {

    const getImgPath = (path: string) => {
        function substr(string: string, start: number, length?: number) {
            let finalString = "";

            // Check if start value is negative
            if (start < 0) {
                start = string.length + start;
            }

            // Check if length value is not provided
            if (length === undefined) {
                length = string.length;
            }

            // Check if length value is negative
            if (length < 0) {
                length = string.length + length - start;
            }

            // Extract the desired substring
            for (let i = start; i < start + length; i++) {
                if (string[i] === undefined) {
                    break;
                }

                finalString += string[i];
            }

            return finalString;
        }
        let suffix;
        if (!path) {
            return '//elm.cangdu.org/img/default.jpg'
        }
        if (path.indexOf('jpeg') !== -1) {
            suffix = '.jpeg'
        } else {
            suffix = '.png'
        }
        let url = '/' + substr(path, 0, 1) + '/' + substr(path, 1, 2) + '/' + substr(path, 3) + suffix;
        return 'https://fuss10.elemecdn.com' + url
    }
    return (
        <Container isEmpty={list.sub_categories.length === 0}>
            <Title>{list.name}</Title>
            <ListWrapper>
                {
                    list.sub_categories.map((item: any) => {
                        return (
                            <ListItem key={item.id}>
                                <Img src={getImgPath(item.image_url)} alt="" />
                                {/* <Img src='https://fuss10.elemecdn.com/4/35/a7eda7659bac613e524ca7c1ae12epng.png' alt="" /> */}
                                <Text>{item.name} <ArrowForwardIcon /></Text>
                            </ListItem>
                        )
                    })
                }
            </ListWrapper>
        </Container>
    )
}

// https://fuss10.elemecdn.com/4/35/a7eda7659bac613e524ca7c1ae12epng.png

const Container = styled.section<{
    isEmpty: boolean
}>`
    display: ${props => props.isEmpty ? 'none' : 'block'};
    padding: 1.5rem 0 1.5rem 1rem;
    position: relative;
    &::before {
        height: 8px;
        width: 100%;
        content: '';
        background-color: ${color.backgroundLight};
        border-top: 1px solid ${color.backgroundMedium};
        border-bottom: 1px solid ${color.backgroundMedium};
        position: absolute;
        display: block;
        bottom: 0;
        left: 0;
    }
`

const Title = styled.h3`
    ${font.size(24)}
    ${font.bold}
`

const ListWrapper = styled.ul`
    display: flex;
    align-items: center;
    ${mixin.scrollableX}
`

const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    margin: 1rem 1.5rem 0rem 0;
    cursor: pointer;
`

const Text = styled.p`
    ${font.size(16)};
    ${font.bold};
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Img = styled.img`
    height: 200px;
    width: 280px;
    margin-bottom: 1rem;
    object-fit: cover;
    border-radius: ${sizes.smallBorderRadius};
    background-color: ${color.backgroundDarkPrimary};
`

export default SubList