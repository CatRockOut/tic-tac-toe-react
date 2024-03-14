import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    squares: Array(9).fill(null).map(() => ({ value: null, disabled: false })),
    currentPlayer: 'cross',
    winner: null,
    draw: false,
    winnerLine: null,
    gameStarted: false,
    gameOver: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.gameStarted = true;
        },
        endGame: (state) => {
            state.gameStarted = false;
        },
        clickSquare: (state, action) => {
            const { player, index } = action.payload;
            const squareIsEmpty = state.squares[index].value;
            const gameIsOver = state.gameOver;
            const currentPlayerIsMakingMove = player === state.currentPlayer;

            // Check if it's possible to make a move:
            if (!squareIsEmpty && !gameIsOver && currentPlayerIsMakingMove) {
                // Update the state of the current square:
                state.squares[index] = { value: player, disabled: true };

                // Check if there is a winner:
                const winnerInfo = calculateWinner(state.squares.map((square) => square.value));
                state.winner = winnerInfo?.winner;
                state.winnerLine = winnerInfo?.winnerLine;

                // If there is a 'winner', then the game ends:
                if (state.winner) {
                    state.gameOver = true;
                }

                // If there is a 'draw', then the game ends:
                const hasEmptySquare = state.squares.find((square) => square.value === null);
                if (!hasEmptySquare) {
                    state.draw = true;
                    state.gameOver = true;
                }

                // Update the 'currentPlayer':
                state.currentPlayer = state.currentPlayer === 'cross' ? 'circle' : 'cross';
            }
        },
        resetGame: () => initialState,
    },
});

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], winnerLine: lines[i] };
        }
    }

    return null;
};

export const { startGame, endGame, clickSquare, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
