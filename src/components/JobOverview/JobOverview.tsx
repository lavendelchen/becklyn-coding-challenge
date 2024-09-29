"use client";

import styles from "./JobOverview.module.css";
import { forwardRef } from "react";
import { useQuery } from "@apollo/client";
import { InitialJobsQuery, InitialJobsQueryVariables } from "@/types/graphql";
import { INITIAL_JOBS } from "@/lib/query";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";

type SelectRootSlotProps<TValue, Multiple> = {
  ownerState: any;
  children?: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, SelectRootSlotProps<any, any>>(
  function Button(props, ref) {
    const { ownerState, ...other } = props;
    return (
      <button type="button" {...other} ref={ref}>
        {other.children}
        <span className="material-symbols-outlined"> 
          keyboard_arrow_down
        </span>
      </button>
    );
  }
);

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
    jobCount = data.jobCollection.total;


  return (
    <div className={styles.jobOverview}>
      <h5 className={styles.subHeading}>{jobCount} offene Stellen bei CreditPlus</h5>
      <h1 className={styles.heading}>Hier beginnt deine Zukunft</h1>
      <div className={styles.filters}>
        {Array.from({ length: 3 }, (_, index) => (
          <Select
            key={index}
            className={styles.select}
            slots={{
              root: Button
            }}
            slotProps={{
              popup: { className: styles.selectPopup },
              listbox: { className: styles.selectListbox },
            }}
            value="Hello"
            onChange={(event, newValue) => {}}
          >
            <Option className={styles.selectOption} key="Hello" value="Hello">
              Hello
            </Option>
            <Option className={styles.selectOption} key="Hello" value="Hello">
              Hello
            </Option>
          </Select>
        ))}
      </div>
    </div>
  );
}
