import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { ChakraProvider, createSystem, Flex, Box } from '@chakra-ui/react';
import { theme } from './theme';

import NavBar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Create the system for Chakra UI
const system = createSystem(theme);

function App() {
  return (
    <ChakraProvider value={system}>
      <ApolloProvider client={client}>
        <Flex direction="column" minH="100vh">
          <NavBar />
          <Box flex="1">
            <Outlet />
          </Box>
        </Flex>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
