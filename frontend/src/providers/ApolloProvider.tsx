import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloProviderClient,
} from "@apollo/client";

interface CustomFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
  
  return (
    <ApolloProviderClient client={client}>
      {children}
    </ApolloProviderClient>
  );
}


