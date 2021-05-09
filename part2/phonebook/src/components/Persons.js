import React from "react";

const Persons = ({ persons, filter, handlePersonRemoval }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={(event) => handlePersonRemoval(person.id)}>
          delete
        </button>
      </li>
    ));
};

export default Persons;
