import { createSlice } from '@reduxjs/toolkit';

const currencySlice = createSlice({
    name: "currency",    
    initialState: {
        currencies: ['NGN', 'USD', 'GBP'],
        currency: 'NGN',
    },    
    reducers: {
        select: (state, param) => {
            const { payload } = param;
            state.currency = [...state.currency, payload];
        },
    }
});

const { actions, reducer } = currencySlice
export const { select } = actions;
export default reducer;