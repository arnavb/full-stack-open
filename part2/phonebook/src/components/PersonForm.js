import React, { useState } from "react";

const PersonForm = ({ handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(newName, newPhoneNumber);
        setNewName("");
        setNewPhoneNumber("");
      }}
    >
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <br />
        phone number:{" "}
        <input
          value={newPhoneNumber}
          onChange={(event) => setNewPhoneNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
