import { configureStore } from '@reduxjs/toolkit';
import { locationSlice } from './locationSlice';

const store = configureStore({
    reducer: {
        location: locationSlice.reducer
    }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
