import React, { useEffect } from 'react';
import Square from '../Square/Square';
import styles from './Board.module.css';
import Chat from '../Chat/Chat';
import { useSelector, useDispatch } from 'react-redux';
import {
    startGame,
    endGame,
    clickSquare,
    resetGame,
} from '../../store/reducers/gameSlice';

function Board({ player }) {
    const { squares, gameOver, gameStarted, currentPlayer, winner, draw } = useSelector(
        (state) => state.game
    );
    const dispatch = useDispatch();

    // Set the "gameStarted: true" when loading the component to display the text 'Game started!':
    useEffect(() => {
        dispatch(startGame());
    }, [dispatch]);

    // When the game is over, the game restart after 5 seconds:
    useEffect(() => {
        if (gameOver) {
            const timer = setTimeout(() => {
                dispatch(resetGame());
                dispatch(startGame());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [gameOver, dispatch]);

    const handleClick = (player, index) => {
        if (gameStarted === true) {
            // Set the "gameStarted: false" to remove the text 'Game started!':
            dispatch(endGame());
        }

        dispatch(clickSquare({ player: player.playerFigureClass, index }));
    };

    const getMessageAndColor = (
        gameStarted,
        gameOver,
        currentPlayer,
        winner,
        draw,
        player
    ) => {
        if (gameStarted) {
            return {
                message:
                    currentPlayer === player.playerFigureClass
                        ? 'Game started! Your turn:'
                        : 'Game started! Wait your opponent.',
            };
        } else if (gameOver) {
            if (winner === player.playerFigureClass) {
                return { message: 'You won!', color: 'winningColor' };
            } else if (!winner && draw) {
                return { message: 'Draw!' };
            } else {
                return { message: 'You lost!', color: 'losingColor' };
            }
        } else {
            return {
                message:
                    currentPlayer === player.playerFigureClass
                        ? 'Your turn:'
                        : 'Wait your opponent.',
            };
        }
    };

    const { message, color } = getMessageAndColor(
        gameStarted,
        gameOver,
        currentPlayer,
        winner,
        draw,
        player
    );

    return (
        <section className={styles.board}>
            <h3 className={`${styles[color]}`}>{message}</h3>
            <div className={styles.square}>
                {squares.map((square, index) => (
                    <Square
                        key={index}
                        index={index}
                        value={square.value}
                        handleSquareClick={() => handleClick(player, index)}
                    />
                ))}
            </div>
            <Chat player={player} />
        </section>
    );
}

export default Board;
