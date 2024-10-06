"use client";

import styles from "./JobOverview.module.css";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  JobsQuery,
  JobsQueryVariables
} from "@/types/graphqlGenerated";
import { JobItems } from "@/types/graphqlAdditional";
import { JOBS_QUERY } from "@/lib/query";

import JobFilters, {
  HandleFilterChange,
  JobFilterValues
} from "../JobFilters/JobFilters";
import JobCard from "../JobCard/JobCard";
import Pagination from "../Pagination/Pagination";

const PAGINATION_LIMIT = 5;

export default function JobOverview() {
  const [totalJobCount, setTotalJobCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [department, setDepartment]   = useState<string | null>(null);
  const [city, setCity]               = useState<string | null>(null);
  const [level, setLevel]             = useState<string | null>(null);

  const jobsVariables = {
    "limit": PAGINATION_LIMIT,
    "skip": PAGINATION_LIMIT * (currentPage - 1),
    "where": {
      "available": true,
      "department": {
        "title": department
      },
      "levels": {
        "title": level
      },
      "locations": {
        "city": city
      }
    },
  }

  const jobsQuery = useQuery<JobsQuery, JobsQueryVariables>(
    JOBS_QUERY,
    { variables: jobsVariables }
  )

  let currentJobCount = 0;
  let jobs: JobItems = [];
  let pagesCount = 0;

  if (jobsQuery.data?.jobCollection) {
    if (totalJobCount === 0)
      setTotalJobCount(jobsQuery.data.jobCollection.total);
    currentJobCount = jobsQuery.data.jobCollection.total;
    jobs = jobsQuery.data.jobCollection.items;
    pagesCount = Math.ceil(currentJobCount / PAGINATION_LIMIT);
  }

  const showJobsPlaceholder = (
    (jobsQuery.loading || jobsQuery.error || currentJobCount <= 0) ?
    true : false
  )
  const jobsPlaceholder = () => {
    if (jobsQuery.loading)
      return "Jobangebote werden geladen...";
    else if (jobsQuery.error)
      return jobsQuery.error.message;
    else
      return "Leider gibt es für Ihre Anfrage keine Jobangebote."
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleFilterChange: HandleFilterChange = {
    department: (_, newDepartment) => {
      setDepartment(newDepartment);
      setCurrentPage(1);
    },
    city: (_, newCity) => {
      setCity(newCity);
      setCurrentPage(1);
    },
    level: (_, newLevel) => {
      setLevel(newLevel);
      setCurrentPage(1);
    }
  };

  return (
    <main>
      <div className={styles.jobOverviewHeader}>
        <h5 className={styles.subHeading}>{totalJobCount} offene Stellen bei CreditPlus</h5>
        <h1 className={styles.heading}>Hier beginnt deine Zukunft</h1>
        <JobFilters
          values={{
            department: department,
            city: city,
            level: level
          } as JobFilterValues}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.jobOverviewBody}>
        <h2 className={styles.bodyHeading}>Aktuelle Jobangebote</h2>
        {showJobsPlaceholder ? (
        <h3 className={`${styles.jobsPlaceholder} ${jobsQuery.error ? styles.error : ""}`}>
          {jobsPlaceholder()}
        </h3>
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
    </main>
  );
}
