import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./../Queries/Countries.query";

import './Countries.module.scss';

interface Country {
  code: string;
  name: string;
  emoji: string;
}

interface CountriesData {
  countries: Country[];
}

export const Countries: React.FC = () => {
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
};
