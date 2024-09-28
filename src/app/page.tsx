"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { getInitialJobs } from "@/lib/api";

let jobData: any = {}

getInitialJobs().then((data) => {
  jobData = data
  console.dir(jobData, { depth: null, colors: true})
})

export default function JobOverview() {
  return (
    <div className={styles.page}>
      {Object.keys(jobData).length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h6>{jobData.items.} offene Stellen bei ...</h6>
          <h1>Hier beginnt deine Zukunft</h1>
        </>
      )}
    </div>
  );
}
