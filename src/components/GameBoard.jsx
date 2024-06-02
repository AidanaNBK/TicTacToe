const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, gameTurn }) {
  let gameBoard = initialGameBoard;
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

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
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
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
