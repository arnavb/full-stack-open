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

const MultipleCountryList = ({ countries }) => {
  const [oneCountry, setOneCountry] = useState(null);

  const handleClick = (_, country) => {
    setOneCountry(country);
  };

  return (
    <div>
      {oneCountry ? (
        <OneCountryInfo country={oneCountry} />
      ) : (
        countries.map((country) => (
          <p key={country.numericCode}>
            {country.name}{" "}
            <button onClick={(event) => handleClick(event, country)}>
              Show info
            </button>
          </p>
        ))
      )}
    </div>
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
    countryInfo = <MultipleCountryList countries={filteredCountries} />;
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
