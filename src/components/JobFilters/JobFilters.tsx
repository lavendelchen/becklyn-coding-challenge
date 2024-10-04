import styles from "./JobFilters.module.css"

import { useQuery } from "@apollo/client";
import {
  FilterQuery,
  FilterQueryVariables
} from "@/types/graphqlGenerated"
import { FILTER_QUERY } from "@/lib/query";
import { FilterContent, getFilterContent } from "@/lib/utils";

import JobFilter from "../JobFilters/JobFilter/JobFilter";

export default function JobFilters() {
  const filterQuery = useQuery<FilterQuery, FilterQueryVariables>(
    FILTER_QUERY,
    { variables: { where: { available: true } } }
  )

  if (filterQuery.error)
    console.dir(filterQuery.error, { depth: null, color: true})

  let filterContent: FilterContent = {
    departments: new Set<string>(),
    cities: new Set<string>(),
    levels: new Set<string>()
  };
  let disableFilters = (
    filterQuery.loading || filterQuery.error ?
    true : false
  );

  if (filterQuery.data?.jobCollection) {
    filterContent = getFilterContent(filterQuery.data?.jobCollection.items)
    console.dir(filterContent, { depth: null, color: true}) ///
  }

  const determinePlaceholder = (filterName: string) => {
    if (filterQuery.loading)
      return "Laden...";
    else if (filterQuery.error)
      return "Error :(";
    else if (filterQuery.data)
      return filterName;
    else
      return "You should never see this 🚨"
  }

  return (
    <div className={styles.filters}>
      <JobFilter
        set={filterContent.departments}
        placeholder={determinePlaceholder("Bereich")}
        disabled={disableFilters}
      />
      <JobFilter
        set={filterContent.cities}
        placeholder={determinePlaceholder("Stadt")}
        disabled={disableFilters}
      />
      <JobFilter
        set={filterContent.levels}
        placeholder={determinePlaceholder("Erfahrungslevel")}
        disabled={disableFilters}
      />
    </div>
  )
}
