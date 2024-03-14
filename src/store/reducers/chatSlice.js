import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const { player, text } = action.payload;
            state.messages.push({ player, text });
        },
        resetChat: () => initialState,
    },
});

export const { addMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
