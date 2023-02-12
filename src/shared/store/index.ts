import create from '@ant-design/icons/lib/components/IconFont';
import { createSlice, configureStore } from '@reduxjs/toolkit';

interface Location {
    name: string | null,
    latitude: number | null,
    longitude: number | null,
    pingyin: string | null,
    recentSearches: string[]
}

const initialValue: Location = {
    name: null,
    latitude: null,
    longitude: null,
    pingyin: null,
    recentSearches: []
}

export const locationSlice = createSlice({
    name: 'location',
    initialState: initialValue,
    reducers: {
        // updateLocation: (state) => {
        //     state.name = name
        // },
        addRecentSearches(state, action) {
            state.recentSearches.push(action.payload)
            if (state.recentSearches.length > 8) {
                state.recentSearches.shift()
            }
        },
        clearSearchHistory(state) {
            state.recentSearches = []
        },
        setLocation(state, action) {
            state.name = action.payload.name
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
            state.pingyin = action.payload.pingyin
        }
    }
})

export const {
    addRecentSearches,
    clearSearchHistory,
    setLocation
} = locationSlice.actions

const store = configureStore({
    reducer: {
        location: locationSlice.reducer
    }
})

export default store
