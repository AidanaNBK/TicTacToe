import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

import { useState } from "react";

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);

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
        <GameBoard onSelectSquare={handleChangePlayer} gameTurn={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
