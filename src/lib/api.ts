import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";

const EXAMPLE_QUERY = gql`
  query ExampleQuery($limit: Int) {
    jobCollection(limit: $limit) {
      items {
        name
        title
      }
    }
  }
`;

export async function exampleApiCall() {
  const client = createApolloClient()

  try {
    const { data } = await client.query({
      query: EXAMPLE_QUERY,
      variables: { limit: 10 }
    });

    console.dir(data, { depth: null, colors: true})
  } catch (error) {
    console.error("Error fetching GraphQL data")
    console.dir(error, { depth: 6, colors: true})
  }
}