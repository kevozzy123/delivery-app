import React from 'react'
import styled from 'styled-components'

const FullPageFallback = () => {
    return (
        <div>
            12121212
            {/* <ErrorImg src={'/img/error.jpg'} /> */}
        </div>
    )
}

const ErrorImg = styled.img`
    height: 150px;
    width: 100px;
    object-fit: cover;
`
export default FullPageFallback