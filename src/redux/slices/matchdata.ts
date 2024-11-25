import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
};

const slice = createSlice({
    name: 'matchdata',
    initialState,
    reducers: {
        setMatchData(state, { payload }) {
            return {
                ...state,
                title: payload,
            };
        },
    },
});

export default slice.reducer;

export const { setMatchData } = slice.actions;


