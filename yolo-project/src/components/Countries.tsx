import { useQuery } from "@apollo/client";
import React, { useState } from 'react';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CODE } from "./../Queries/Countries.query";

import styles from './Countries.module.scss';

interface Country {
  code: string;
  name: string;
}

interface CountriesData {
  countries: Country[];
}

interface CountriesByCode {
  code: string;
}

/* export const Countries: React.FC = () => {
  const { data, loading, error } = useQuery<CountriesData>(GET_COUNTRIES);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <table>
      <tr><th colSpan={2}><h2>Countries List</h2></th></tr>
      <tr><th>Country Name</th><th>Country Code</th></tr>
        {data?.countries.map((country) => (
          <tr><td>{country.name}</td><td>{country.code}</td></tr>
        ))}
      </table>
    </div>
  );
}; */

export const Countries: React.FC = () => {
  const [countryCode, setCountryCode] = useState<string>('');

  const { loading: loadingAll, error: errorAll, data: allCountries } = useQuery<CountriesData>(GET_COUNTRIES);
  
  const { loading: loadingFiltered, error: errorFiltered, data: filteredCountries } = useQuery<CountriesData, CountriesByCode>(GET_COUNTRIES_BY_CODE, {
    variables: { code: countryCode.toUpperCase() },
    skip: !countryCode,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(event.target.value);
  };

  return (
    <table>
      { loadingAll && <p>Loading data... </p> }
      { errorAll && <p>Error in data: {errorAll.message}</p>}
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

      {(countryCode.length == 2 ? filteredCountries?.countries : allCountries?.countries)?.map((country) => (
        <tr key={country.code}>
          <td>{country.name}</td>
          <td>{country.code}</td>
        </tr>
      ))}

      {countryCode && loadingFiltered && <p>Filtering...</p>}
      {countryCode && errorFiltered && <p>Error filtering: {errorFiltered.message}</p>}
    </table>
    // <div>{ loadingAll && <p>Filtering...</p>}</div>
    // <div>{ errorAll && <p>Filtering...</p>}</div>
  );
};
