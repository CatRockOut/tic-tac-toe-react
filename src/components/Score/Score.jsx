import React, { useEffect } from 'react';
import styles from './Score.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, resetGame } from '../../store/reducers/gameSlice';
import { winCounter, resetScore } from '../../store/reducers/scoreSlice';
import { resetChat } from '../../store/reducers/chatSlice';

function Score({ player }) {
    const winningCount = useSelector((state) => state.score.winningCount);
    const winner = useSelector((state) => state.game.winner);
    const dispatch = useDispatch();

    // Counter of winners in the header:
    useEffect(() => {
        if (winner !== null) {
            dispatch(winCounter(winner));
        }
    }, [winner, dispatch]);

    // Game 'Reset' button in the header:
    const resetGameButton = () => {
        dispatch(resetGame());
        dispatch(resetScore());
        dispatch(resetChat());
        dispatch(startGame());
    };

    return (
        <header>
            <span>{player[0].name}</span>
            <div className={styles.score}>
                <span>
                    Score: {winningCount.cross}:{winningCount.circle}
                </span>
                <button onClick={resetGameButton}>Reset</button>
            </div>
            <span>{player[1].name}</span>
        </header>
    );
}

export default Score;
