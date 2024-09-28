"use client";

import styles from "./JobOverview.module.css";
import { useQuery } from "@apollo/client";
import { InitialJobsQuery, InitialJobsQueryVariables } from "@/types/graphql";
import { INITIAL_JOBS } from "@/lib/query";

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

  const { loading, error, data } = useQuery<InitialJobsQuery, InitialJobsQueryVariables>(INITIAL_JOBS, {
    variables: initialJobsVariables
  })

  if (error)
    console.dir(error, { depth: null, color: true})

  if (data?.jobCollection)
    jobCount = data.jobCollection.total


  return (
    <div className={styles.jobOverview}>
      <h6>{jobCount} offene Stellen bei CreditPlus</h6>
      <h1>Hier beginnt deine Zukunft</h1>
    </div>
  );
}
