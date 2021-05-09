import React, { useEffect, useState } from "react";
import axios from "axios";

const OneCountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>

      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h3>Languages spoken</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>

      <img alt={`Flag for ${country.name}`} src={country.flag} />
    </>
  );
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  let countryInfo;
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    countryInfo = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    countryInfo = filteredCountries.map((country) => (
      <p key={country.alpha2Code}>{country.name}</p>
    ));
  } else if (filteredCountries.length === 1) {
    countryInfo = <OneCountryInfo country={filteredCountries[0]} />;
  }

  return (
    <div>
      find countries:{" "}
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      {countryInfo}
    </div>
  );
};

export default App;
