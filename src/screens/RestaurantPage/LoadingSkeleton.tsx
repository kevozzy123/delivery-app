import React from 'react'
import { Skeleton } from '@mui/material'
import styled from 'styled-components'

const style = { marginBottom: 6, marginLeft: 20 }

const LoadingSkeleton = () => {
    return (
        <SkeletonWrapper>
            <Skeleton
                variant="rectangular"
                width={'100%'}
                height={200}
                style={{ marginBottom: '20px' }}
            />
            <Skeleton
                height={25}
                width="30%"
                style={style}
            />
            <Skeleton
                height={25}
                width="30%"
                style={style}
            />
            <Skeleton
                height={25}
                width="30%"
                style={style}
            />
        </SkeletonWrapper>
    )
}

const SkeletonWrapper = styled.div`
    margin-top: -60px;
`

export default React.memo(LoadingSkeleton)