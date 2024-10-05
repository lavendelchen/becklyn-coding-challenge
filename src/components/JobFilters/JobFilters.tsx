import styles from "./JobFilters.module.css";

import { useQuery } from "@apollo/client";
import {
  FilterQuery,
  FilterQueryVariables
} from "@/types/graphqlGenerated";
import { FILTER_QUERY } from "@/lib/query";
import { FilterOptions, getFilterOptions } from "@/lib/getFilterOptions";

import JobFilter, { OnFilterChange } from "../JobFilters/JobFilter/JobFilter";

export interface JobFilterValues {
  department: string | null;
  city: string | null;
  level: string | null;
}

export interface HandleFilterChange {
  department: OnFilterChange;
  city: OnFilterChange;
  level: OnFilterChange;
}

interface JobFiltersProps {
  values: JobFilterValues;
  handleFilterChange: HandleFilterChange;
};

export default function JobFilters({
  values, handleFilterChange
}: JobFiltersProps) {
  const filterQuery = useQuery<FilterQuery, FilterQueryVariables>(
    FILTER_QUERY,
    { variables: { where: { available: true } } }
  )

  if (filterQuery.error)
    console.dir(filterQuery.error, { depth: null, color: true})

  let options: FilterOptions = {
    departments: [],
    cities: [],
    levels: []
  };
  let disableFilters = (
    filterQuery.loading || filterQuery.error ?
    true : false
  );

  if (filterQuery.data?.jobCollection) {
    options = getFilterOptions(filterQuery.data?.jobCollection.items)
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
        value={values.department}
        onChange={handleFilterChange.department}
        options={options.departments}
        placeholder={determinePlaceholder("Bereich")}
        disabled={disableFilters}
      />
      <JobFilter
        value={values.city}
        onChange={handleFilterChange.city}
        options={options.cities}
        placeholder={determinePlaceholder("Stadt")}
        disabled={disableFilters}
      />
      <JobFilter
        value={values.level}
        onChange={handleFilterChange.level}
        options={options.levels}
        placeholder={determinePlaceholder("Erfahrungslevel")}
        disabled={disableFilters}
      />
    </div>
  )
}
