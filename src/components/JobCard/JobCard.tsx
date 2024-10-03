import {
  LinkIcon,
  LocationIcon,
  TypeIcon
} from "./icons/icons";
import styles from "./JobCard.module.css";
import Link from "next/link";

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
  return (
    <li className={styles.jobCard} key={index}>
      <h5 className={styles.department}>{department?.title}</h5>
      <Link className={styles.link} href="/">
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