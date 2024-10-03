import { gql } from "@apollo/client";

export const JOBS_QUERY = gql`
  query Jobs($limit: Int, $skip: Int, $locale: String, $where: JobFilter) {
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
