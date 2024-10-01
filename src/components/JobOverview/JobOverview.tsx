"use client";

import styles from "./JobOverview.module.css";
import { useQuery } from "@apollo/client";
import {
  InitialJobsQuery,
  InitialJobsQueryVariables,
  Job,
  JobItems,
  Maybe
} from "@/types/graphql";
import { INITIAL_JOBS } from "@/lib/query";
import JobFilter from "../JobFilter/JobFilter";
import JobCard from "../JobCard/JobCard";

export default function JobOverview() {
  const initialJobsVariables = {
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
  let jobCount = 0;
  let jobs: JobItems = [];

  const { loading, error, data } = useQuery<InitialJobsQuery, InitialJobsQueryVariables>(INITIAL_JOBS, {
    variables: initialJobsVariables
  })

  if (error)
    console.dir(error, { depth: null, color: true})

  if (data?.jobCollection) {
    jobCount = data.jobCollection.total;
    jobs = data.jobCollection.items;
  }


  return (
    <>
      <div className={styles.jobOverviewHeader}>
        <h5 className={styles.subHeading}>{jobCount} offene Stellen bei CreditPlus</h5>
        <h1 className={styles.heading}>Hier beginnt deine Zukunft</h1>
        <div className={styles.filters}>
          {Array.from({ length: 3 }, (_, index) => (
            <JobFilter />
          ))}
        </div>
      </div>
      <div className={styles.jobOverviewBody}>
        <h2 className={styles.bodyHeading}>Aktuelle Jobangebote</h2>
        <ul className={styles.jobsList}>
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            department={job?.department}
            title={job?.title}
            locations={job?.locationsCollection?.items}
            types={job?.typesCollection?.items}
          />
        ))}
        </ul>
      </div>
    </>
  );
}
