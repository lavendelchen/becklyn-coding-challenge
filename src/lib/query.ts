import { gql } from "@apollo/client";

const LOCALE = "de"

export const JOBS_QUERY = gql`
  query Jobs($limit: Int, $skip: Int, $where: JobFilter) {
    jobCollection(limit: $limit, skip: $skip, where: $where, locale: "${LOCALE}") {
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

export const FILTER_QUERY = gql`
  query Filter($where: JobFilter) {
    jobCollection(where: $where, locale: "${LOCALE}", limit: null) {
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
        levelsCollection {
          total
          items {
            title
          }
        }
      }
    }
  }
`
