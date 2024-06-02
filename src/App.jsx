import PlayerInfo from "./components/PlayerInfo";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <PlayerInfo name="Player1" symbol="X"></PlayerInfo>
          <PlayerInfo name="Player2" symbol="O"></PlayerInfo>
        </ol>
        GAME BOARD
      </div>
    </main>
  );
}

export default App;
