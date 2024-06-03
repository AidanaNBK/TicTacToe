import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

import { useState } from "react";

const PLAYERS = { X: "Player1", O: "Player2" };

const INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard) {
  let hasWinner = null;
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
  return hasWinner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  // Need to use the deep copy for ability to then restart the game
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }
  return gameBoard;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  let [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);

  const [players, setPlayers] = useState(PLAYERS);

  function handlePlayerChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  let gameBoard = deriveGameBoard(gameTurns);
  const hasWinner = deriveWinner(gameBoard);
  let hasDraw = gameTurns.length === 9 && !hasWinner;

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
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            changeName={handlePlayerChange}
          ></PlayerInfo>
          <PlayerInfo
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            changeName={handlePlayerChange}
          ></PlayerInfo>
        </ol>
        {(hasWinner || hasDraw) && (
          <GameOver
            winner={hasWinner}
            draw={hasDraw}
            players={players}
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
