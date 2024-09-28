import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const endpoint = process.env.CONTENTFUL_ENDPOINT;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  return new ApolloClient({
    uri: `${endpoint}?access_token=${accessToken}`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
