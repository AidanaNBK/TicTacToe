export default function GameBoard({ onSelectSquare, gameBoard }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   function handleChangeBoard(rowIndex, colIndex, play) {
  //     setGameBoard((gameBoard) => {
  //       const updatedBoard = [...gameBoard.map((innerArray) => [...innerArray])];
  //       updatedBoard[rowIndex][colIndex] = play;
  //       return updatedBoard;
  //     });
  //     onSelectSquare();
  //   }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symb, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={symb !== null}
                >
                  {symb}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
