import { useQuery } from "@apollo/client";
import React, { useState } from 'react';
import { GET_COUNTRIES, GET_COUNTRIES_BY_CODE } from "./../Queries/Countries.query";

import './Countries.module.scss';

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

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryCode(event.target.value);
  };

  // Show loading states
  if (loadingAll) return <p>Loading countries...</p>;
  if (errorAll) return <p>Error loading countries: {errorAll.message}</p>;

  return (
    <table>
      <tr>
        <th colSpan={2}><h1>Countries List</h1>
        </th>
      </tr>
      <tr>
        <td>
          <input type="text" placeholder="Enter country code (e.g., US)" value={countryCode} onChange={handleInputChange} />
        </td>
      </tr>

      {(countryCode ? filteredCountries?.countries : allCountries?.countries)?.map((country) => (
        <tr key={country.code}>
          <td>{country.name}</td>
          <td>{country.code}</td>
        </tr>
      ))}

      {countryCode && loadingFiltered && <p>Filtering...</p>}
      {countryCode && errorFiltered && <p>Error filtering: {errorFiltered.message}</p>}
    </table>
  );
};
