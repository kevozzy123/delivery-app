import React, { ReactNode } from 'react'
import { AuthProvider } from './authContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        // <QueryClientProvider client={QueryClient}>
        <AuthProvider>
            {children}
        </AuthProvider>
        // </QueryClientProvider>
    )
}

export default AppProvider