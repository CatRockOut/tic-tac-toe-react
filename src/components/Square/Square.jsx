import React from 'react';
import styles from './Square.module.css';
import { useSelector } from 'react-redux';

function Square({ value, index, handleSquareClick }) {
    const winnerLine = useSelector((state) => state.game.winnerLine);
    const isWinningSquare = winnerLine && winnerLine.includes(index);

    // Sets the style of the winning line on the board:
    const getWinningLineStyle = () => {
        if (!winnerLine || winnerLine.length !== 3) {
            return '';
        }

        const rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ];
        const columns = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ];
        const diagonals = [
            [0, 4, 8],
            [2, 4, 6],
        ];

        let winningLineStyles = '';

        rows.forEach((row) => {
            if (row.every((index) => winnerLine.includes(index))) {
                winningLineStyles = styles.horizontalLine;
            }
        });

        columns.forEach((column) => {
            if (column.every((index) => winnerLine.includes(index))) {
                winningLineStyles = styles.verticalLine;
            }
        });

        diagonals.forEach((diagonal, i) => {
            if (diagonal.every((index) => winnerLine.includes(index))) {
                winningLineStyles =
                    i === 0
                        ? styles.diagonalLineLeft
                        : styles.diagonalLineRight;
            }
        });

        return winningLineStyles;
    };

    return (
        <button className={`${value ? styles[value] : ''}`} onClick={handleSquareClick}>
            {isWinningSquare && (
                <div className={`${getWinningLineStyle()}`}></div>
            )}
        </button>
    );
}

export default Square;
