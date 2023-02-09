import React, { Children, ReactNode, useContext } from 'react'

const AddressContext = React.createContext<
    {
        address: string,
        changeAddress: (id: number) => Promise<void>,
        addAddress: () => Promise<void>,
        deleteAddress: () => Promise<void>
    }
    | undefined
>(undefined)

const addressContext = ({ children }: { children: ReactNode }) => {
    return (
        <AddressContext.Provider
            value={undefined}
        >
            {children}
        </AddressContext.Provider>
    )
}

export const useAddressContext = () => {
    const context = useContext(AddressContext)

    return context
}

export default addressContext