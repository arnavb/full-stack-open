import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const SERVER_URL = "http://localhost:3001";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`${SERVER_URL}/persons`).then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (newName, newPhoneNumber) => {
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in the phonebook!`);
    } else {
      setPersons([...persons, { name: newName, number: newPhoneNumber }]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={setFilter} />
      <h2>Add a new person</h2>
      <PersonForm handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
