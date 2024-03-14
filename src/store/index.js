import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducers/gameSlice';
import scoreReducer from './reducers/scoreSlice';
import chatReducer from './reducers/chatSlice';

export default configureStore({
    reducer: {
        game: gameReducer,
        score: scoreReducer,
        chat: chatReducer,
    },
});
