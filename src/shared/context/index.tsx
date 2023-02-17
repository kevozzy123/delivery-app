import React, { ReactNode } from 'react'
import { AuthProvider } from './authContext'
// import { QueryClient, QueryClientProvider } from 'react-query'

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default AppProvider