import { useState } from "react";
export default function PlayerInfo({ name, symbol }) {
  let [userName, setPlayerName] = useState(name);
  let [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
  }
  function handleChangeName(event) {
    // console.log(event);
    setPlayerName(event.target.value);
  }

  let playerName = !isEditing ? (
    <span className="player-name"> {userName} </span>
  ) : (
    <input
      type="text"
      required
      value={userName}
      onChange={handleChangeName}
    ></input>
  );

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol"> {symbol} </span>
      </span>

      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
