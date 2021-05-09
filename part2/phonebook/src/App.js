import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [failureNotification, setFailureNotification] = useState(false);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addNewPerson = (newName, newPhoneNumber) => {
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Update their phone number?`
        )
      ) {
        updateExistingPerson(newName, newPhoneNumber);
      }
    } else {
      personsService
        .create({ name: newName, number: newPhoneNumber })
        .then((newPerson) => {
          setPersons([...persons, newPerson]);
          setNotificationMessage(`Successfully added ${newName}`);
          setTimeout(() => {
            setNotificationMessage("");
          }, 5000);
        });
    }
  };

  const updateExistingPerson = (name, newPhoneNumber) => {
    const correspondingPerson = persons.find((person) => person.name === name);
    personsService
      .update(correspondingPerson.id, {
        ...correspondingPerson,
        name,
        number: newPhoneNumber,
      })
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );
        setNotificationMessage(`Successfully changed phone number for ${name}`);
        setTimeout(() => {
          setNotificationMessage("");
        }, 5000);
      })
      .catch((error) => {
        setNotificationMessage(`${name} was already removed from the server!`);
        setFailureNotification(true);

        setTimeout(() => {
          setNotificationMessage("");
          setFailureNotification(false);
        }, 5000);

        setPersons(
          persons.filter((person) => person.id !== correspondingPerson.id)
        );
      });
  };

  const removePerson = (id) => {
    const correspondingPerson = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${correspondingPerson.name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          failureNotification={failureNotification}
        />
      )}
      <Filter value={filter} handleChange={setFilter} />
      <h2>Add a new person</h2>
      <PersonForm handleSubmit={addNewPerson} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handlePersonRemoval={removePerson}
      />
    </div>
  );
};

export default App;
