export default function GameOver({ winner, draw, restart, players }) {
  console.log(draw);
  let showText = <p> It's a Draw! </p>;
  if (!draw) {
    let winnerPlayer = players[winner];
    showText = <p>{winnerPlayer} WON the Game!</p>;
  }
  return (
    <div id="game-over">
      <h2> Game Over! </h2>
      {showText}
      <button onClick={restart}> Restart the Game? </button>
    </div>
  );
}
