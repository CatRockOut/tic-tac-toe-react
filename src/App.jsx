import React from 'react';
import './App.css';
import Board from './components/Board/Board';
import Score from './components/Score/Score';
import data from './data';

function App() {
    return (
        <div className="App">
            <Score player={data} />
            <main>
                {data.map((_, index) => (
                    <Board key={index} player={data[index]} />
                ))}
            </main>
        </div>
    );
}

export default App;
