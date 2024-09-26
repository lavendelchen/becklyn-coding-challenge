import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  return new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/h4fy7qjn6mui/environments/integration?access_token=${accessToken}`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
