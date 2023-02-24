import styled from 'styled-components'
import { useEffect } from 'react';

const NotCompleted = () => {

    return (
        <Page>
            <h3>This featured isn't open</h3>
            <p style={{ marginTop: '50px' }}>This page is a placeholder for the imcomplete page</p>
        </Page>
    )
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(200px);
`

export default NotCompleted