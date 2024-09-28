import { gql } from "@apollo/client";
import createApolloClient from "../lib/apolloClient";

const INITIAL_JOBS = gql`
  query InitialJobs($limit: Int, $skip: Int, $locale: String, $where: JobFilter) {
  jobCollection(limit: $limit, skip: $skip, locale: $locale, where: $where) {
    total
    items {
      department {
        title
      }
      locationsCollection {
        total
        items {
          city
        }
      }
      name
      title
      typesCollection {
        items {
          title
        }
        total
      }
    }
  }
}
`;

const client = createApolloClient()

export async function getInitialJobs() {
  try {
    const { data } = await client.query({
      query: INITIAL_JOBS,
      variables: {
        "limit": 10,
        "skip": null,
        "locale": "de",
        "where": {
          "available": true,
          "department": {
            "title": null
          },
          "levels": {
            "title": null
          },
          "locations": {
            "city": null
          }
        },
      }
    });

    return data
  } catch (error) {
    console.error("Error fetching GraphQL data")
    console.dir(error, { depth: 6, colors: true})
  }
}