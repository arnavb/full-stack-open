import React, { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;

const OneCountryInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: { access_key: WEATHER_API_KEY, query: country.capital },
      })
      .then((response) => {
        setWeatherInfo(response.data.current);
      });
  }, [country]);

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

      <h3>Weather in {country.capital}</h3>

      {weatherInfo && (
        <>
          <p>Temperature: {weatherInfo.temperature} C</p>
          <img
            alt={`Weather icon for ${country.capital}`}
            src={weatherInfo.weather_icons[0]}
          />
          <p>
            Wind: {weatherInfo.wind_speed} mph direction {weatherInfo.wind_dir}
          </p>
        </>
      )}
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
