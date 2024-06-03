export default function GameOver({ winner, draw }) {
  let showText = <p> {winner} won!</p>;
  if (draw) {
    showText = <p> It's a Draw! </p>;
  }
  return (
    <div id="game-over">
      <h2> Game Over! </h2>
      {showText}
      <button> Restart the Game? </button>
    </div>
  );
}
