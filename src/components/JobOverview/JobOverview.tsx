"use client";

import styles from "./JobOverview.module.css";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  FilterQuery,
  FilterQueryVariables,
  JobsQuery,
  JobsQueryVariables
} from "@/types/graphqlGenerated";
import { JobItems } from "@/types/graphqlAdditional";
import { FILTER_QUERY, JOBS_QUERY } from "@/lib/query";
import { FilterContent, getFilterContent } from "@/lib/utils";

import JobFilter from "../JobFilter/JobFilter";
import JobCard from "../JobCard/JobCard";
import Pagination from "../Pagination/Pagination"

const PAGINATION_LIMIT = 5;

export default function JobOverview() {
  const [currentPage, setCurrentPage] = useState(1);

  const jobsVariables = {
    "limit": PAGINATION_LIMIT,
    "skip": PAGINATION_LIMIT * (currentPage - 1),
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

  const jobsQuery = useQuery<JobsQuery, JobsQueryVariables>(JOBS_QUERY, {
    variables: jobsVariables
  })

  const filterQuery = useQuery<FilterQuery, FilterQueryVariables>(FILTER_QUERY, {
    variables: { where: { available: true } }
  })

  if (filterQuery.error)
    console.dir(filterQuery.error, { depth: null, color: true})
  if (jobsQuery.error)
    console.dir(jobsQuery.error, { depth: null, color: true})

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

  let jobCount = 0;
  let jobs: JobItems = [];
  let pagesCount = 0;

  if (jobsQuery.data?.jobCollection) {
    jobCount = jobsQuery.data.jobCollection.total;
    jobs = jobsQuery.data.jobCollection.items;
    pagesCount = Math.ceil(jobCount / PAGINATION_LIMIT);
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
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <div className={styles.jobOverviewHeader}>
        <h5 className={styles.subHeading}>{jobCount} offene Stellen bei CreditPlus</h5>
        <h1 className={styles.heading}>Hier beginnt deine Zukunft</h1>
        <div className={styles.filters}>
          <JobFilter
            set={filterContent.departments}
            disabled={disableFilters}
            placeholder={determinePlaceholder("Bereich")}
          />
        </div>
      </div>
      <div className={styles.jobOverviewBody}>
        <h2 className={styles.bodyHeading}>Aktuelle Jobangebote</h2>
        {jobsQuery.loading ? (
        <h3 className={styles.loading}>Jobangebote werden geladen...</h3>
        ) : (
        <ul className={styles.jobsList}>
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            index={index}
            department={job?.department}
            title={job?.title}
            locations={job?.locationsCollection?.items}
            types={job?.typesCollection?.items}
          />
        ))}
        </ul>
        )}
        <Pagination count={pagesCount} page={currentPage} onPageChange={handlePageChange}/>
      </div>
    </>
  );
}
