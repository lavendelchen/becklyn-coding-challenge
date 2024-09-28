import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const endpoint = process.env.NEXT_PUBLIC_CONTENTFUL_ENDPOINT;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  console.log(`${endpoint}?access_token=${accessToken}`)

  return new ApolloClient({
    uri: `${endpoint}?access_token=${accessToken}`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
