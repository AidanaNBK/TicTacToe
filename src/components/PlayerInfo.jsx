import { useState } from "react";
export default function PlayerInfo({ name, symbol, isActive, changeName }) {
  let [userName, setPlayerName] = useState(name);
  let [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
    changeName(symbol, userName);
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
      // now due to the change in the userName, it will be updated by "value" prop
      onChange={handleChangeName}
    ></input>
  );

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {playerName}
        <span className="player-symbol"> {symbol} </span>
      </span>

      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
