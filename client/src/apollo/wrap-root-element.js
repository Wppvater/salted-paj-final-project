import React from 'react';
import {ApolloProvider} from 'react-apollo';
import { client } from './client';

export const wrapRootElement = ({element}) => {
  console.log(typeof client);
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}