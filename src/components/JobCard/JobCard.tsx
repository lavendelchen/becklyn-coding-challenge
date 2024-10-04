import styles from "./JobCard.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LinkIcon,
  LocationIcon,
  TypeIcon
} from "./icons/icons";

interface JobCardProps {
  index: number;
  department: {
    __typename?: "JobDepartment";
    title?: string | null;
  } | null | undefined,
  title: string | null | undefined,
  locations: ({
    __typename?: "ContentTypeLocation";
    city?: string | null;
  } | null)[] | undefined,
  types: ({
    __typename?: "JobType";
    title?: string | null;
  } | null)[] | undefined
}

export default function JobCard({
  index,
  department,
  title,
  locations,
  types
}: JobCardProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <li className={styles.jobCard} key={index}>
      <h5 className={styles.department}>{department?.title}</h5>
      <Link className={styles.link} href="/">
      {
        windowWidth >= 768 ?
        "Stelle anzeigen" : ""
      }
        <LinkIcon />
      </Link>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.location}>
        <LocationIcon />
        <span className={styles.groupItems}>
        {locations?.map((location, index) => (
          <div key={index}>
            {location?.city}
            {
              index < locations.length - 1 &&
              <span className={styles.comma}>,</span>
            }
          </div>
        ))}
        </span>
      </div>
      <div className={styles.type}>
        <TypeIcon />
        <span className={styles.groupItems}>
        {types?.map((type, index) => (
          <div key={index}>
            {type?.title}
            {
              index < types.length - 1 &&
              <span className={styles.comma}>,</span>
            }
          </div>
        ))}
        </span>
      </div>
    </li>
  )
}