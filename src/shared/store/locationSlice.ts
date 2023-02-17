import create from '@ant-design/icons/lib/components/IconFont';
import { createSlice, configureStore } from '@reduxjs/toolkit';

interface DefaultValue extends Location {
    recentSearches: Location[]
}

export interface Location {
    name: string | null,
    latitude: number | null,
    longitude: number | null,
    pingyin: string | null,
}

const initialValue: DefaultValue = {
    name: null,
    latitude: null,
    longitude: null,
    pingyin: null,
    recentSearches: JSON.parse(localStorage.getItem('recentLocations') || '[]')
}

export const locationSlice = createSlice({
    name: 'location',
    initialState: initialValue,
    reducers: {
        clearSearchHistory(state) {
            state.recentSearches = []
            localStorage.setItem('recentLocations', JSON.stringify(state.recentSearches))
        },
        setLocation(state, action) {
            state.name = action.payload.name
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
            state.pingyin = action.payload.pingyin

            // let alreadyExistInHistory = state.recentSearches.some(search => {
            //     return search === action.payload
            // })
            // if (alreadyExistInHistory) {
            //     state.recentSearches = state.recentSearches.filter(item => {
            //         return item !== action.payload
            //     })
            // }
            // state.recentSearches.push(action.payload)
            // if (state.recentSearches.length > 8) {
            //     state.recentSearches.shift()
            // }
            // localStorage.setItem('recentLocations', JSON.stringify(state.recentSearches))
        }
    }
})

export const {
    clearSearchHistory,
    setLocation
} = locationSlice.actions