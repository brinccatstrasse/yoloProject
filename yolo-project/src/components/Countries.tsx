import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./query";

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
      <tr><td colSpan={2}><h2>Countries List</h2></td></tr>
      <tr><td>Country Name</td><td>Country Code</td></tr>
        {data?.countries.map((country) => (
          <tr><td>{country.name}</td><td>{country.code}</td></tr>
        ))}
      </table>
    </div>
  );
};
