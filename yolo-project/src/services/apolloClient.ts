import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/",
    // Caching data in memory for improved performance
    cache: new InMemoryCache(),
});