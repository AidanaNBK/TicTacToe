import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  let [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);
  let hasWinner = null;
  let hasDraw = gameTurns.length === 9 && !hasWinner;

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  // Need to use the deep copy for ability to then restart the game
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

  for (const comb of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSymbol = gameBoard[comb[2].row][comb[2].column];

    if (
      firstSymbol &&
      secondSymbol &&
      thirdSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      hasWinner = firstSymbol;
    }
  }

  function handleChangePlayer(row, col) {
    // setActivePlayer((activePlayer) => (activePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurn) => {
      let currentPlayer = deriveActivePlayer(gameTurns);

      const updatedTurn = [
        { player: currentPlayer, square: { rowIndex: row, colIndex: col } },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  function restartGame() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo
            name="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
          ></PlayerInfo>
          <PlayerInfo
            name="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
          ></PlayerInfo>
        </ol>
        {(hasWinner || hasDraw) && (
          <GameOver
            winner={hasWinner}
            draw={hasDraw}
            restart={restartGame}
          ></GameOver>
        )}
        <GameBoard onSelectSquare={handleChangePlayer} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
