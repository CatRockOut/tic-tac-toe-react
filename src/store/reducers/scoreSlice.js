import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    winningCount: {
        cross: 0,
        circle: 0,
    },
};

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        winCounter: (state, action) => {
            const player = action.payload;
            state.winningCount[player] += 1;
        },
        resetScore: () => initialState,
    }
});

export const { winCounter, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
