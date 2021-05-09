import React from "react";

const Persons = ({ persons, filter }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <li key={person.name}>
        {person.name} {person.phoneNumber}
      </li>
    ));
};

export default Persons;
