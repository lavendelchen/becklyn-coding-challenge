"use client";

import styles from "./JobOverview.module.css";
import { LinearProgress } from "@mui/material";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  JobsQuery,
  JobsQueryVariables,
  JobItems
} from "@/types/graphql";
import { JOBS_QUERY } from "@/lib/query";

import JobFilter from "../JobFilter/JobFilter";
import JobCard from "../JobCard/JobCard";
import Pagination from "../Pagination/Pagination"

const PAGINATION_LIMIT = 5;

export default function JobOverview() {
  const [currentPage, setCurrentPage] = useState(1);

  const jobsVariables = {
    "limit": PAGINATION_LIMIT,
    "skip": PAGINATION_LIMIT * (currentPage - 1),
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

  const { loading, error, data } = useQuery<JobsQuery, JobsQueryVariables>(JOBS_QUERY, {
    variables: jobsVariables
  })

  if (error)
    console.dir(error, { depth: null, color: true})

  let jobCount = 0;
  let jobs: JobItems = [];
  let pagesCount = 0;

  if (data?.jobCollection) {
    jobCount = data.jobCollection.total;
    jobs = data.jobCollection.items;
    pagesCount = Math.ceil(jobCount / PAGINATION_LIMIT);
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
          {Array.from({ length: 3 }, (_, index) => (
            <JobFilter key={index}/>
          ))}
        </div>
      </div>
      <div className={styles.jobOverviewBody}>
        <h2 className={styles.bodyHeading}>Aktuelle Jobangebote</h2>
        {loading ? (
        <h3 className={styles.loading}>Jobs werden geladen...</h3>
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
