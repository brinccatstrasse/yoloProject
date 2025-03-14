import { useQuery } from "@apollo/client";
import React, { useState } from 'react';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CODE } from "../../graphql/countryQuery";

import styles from './Countries.module.scss';

// Defining the country property
interface Country {
  code: string;
  name: string;
}

// Defines the structure of the GraphQL response data for countries
interface CountriesData {
  // An array of Country objects
  countries: Country[];
}

// Defining the country code property for filtering
interface CountriesByCode {
  code: string;
}

export const Countries: React.FC = () => {
  // State to store the country code input by the user
  const [countryCode, setCountryCode] = useState<string>('');

  // Fetches the list of all countries from the GraphQL API
  const { loading: loadingAll, error: errorAll, data: allCountries } = useQuery<CountriesData>(GET_COUNTRIES);

  // Fetches the data of a country according to the user input by country code
  const { loading: loadingFiltered, error: errorFiltered, data: filteredCountries } = useQuery<CountriesData, CountriesByCode>(GET_COUNTRIES_BY_CODE, {

    // Converting the input data into uppercase
    variables: { code: countryCode.toUpperCase() },
    // if empty, skip the query
    skip: !countryCode,
  });

  // Handling the changes from the user input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(event.target.value);
  };

  return (
    <table>
      {/* Loading and error handling */}
      {loadingAll && <p>Loading data... </p>}
      {errorAll && <p>Error in data: {errorAll.message}</p>}
      <tr>
        <th colSpan={2} className={`${styles.bold}`}><h1>List of Countries</h1>
        </th>
      </tr>
      <tr>
        <td colSpan={2}>
          <input type="text" placeholder="Enter country code (e.g: MT)" value={countryCode} onChange={handleInputChange} />
        </td>
      </tr>

      <tr>
        <td className={`${styles.bold}`}>
          Country Name
        </td>
        <td className={`${styles.bold}`}>
          Country Code
        </td>
      </tr>

      {(countryCode.length == 2
        ? filteredCountries?.countries // If the user input has a length of 2, use filtered countries  
        : allCountries?.countries // else display all data
      )?.map((country) => (
        // Using key attr. to determine which elements in a list have changed, been added, or removed. Using country code since its a unique id
        <tr key={country.code}>
          <td>{country.name}</td>
          <td>{country.code}</td>
        </tr>
      ))}

      {/* Loading and error handling for the filtering */}
      {countryCode && loadingFiltered && <p>Filtering...</p>}
      {countryCode && errorFiltered && <p>Error filtering: {errorFiltered.message}</p>}
    </table>
  );
};
