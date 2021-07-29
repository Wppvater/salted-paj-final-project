import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: process.env.API_LOCATION || "https://safe-everglades-22709.herokuapp.com/api/",
  fetch
});
console.log(process.env.API_LOCATION);