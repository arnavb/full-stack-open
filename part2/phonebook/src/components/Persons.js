import React from "react";

const Persons = ({ persons, filter }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ));
};

export default Persons;
