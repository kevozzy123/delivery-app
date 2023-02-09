import React, { Children, ReactNode, useContext } from 'react'

const CityContext = React.createContext<
    {
        city: string,
        changecity: (id: number) => void
    }
    | undefined
>(undefined)

const CityContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <CityContext.Provider
            value={undefined}
        >
            {children}
        </CityContext.Provider>
    )
}

export const usecityContext = () => {
    const context = useContext(CityContext)

    return context
}

export default CityContextProvider