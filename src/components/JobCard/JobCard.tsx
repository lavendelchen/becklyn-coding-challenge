import styles from "./JobCard.module.css";
import Link from "next/link";

interface JobCardProps {
  key: number;
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
  key,
  department,
  title,
  locations,
  types
}: JobCardProps) {

  return (
    <li className={styles.jobCard} key={key}>
      <h5 className={styles.department}>{department?.title}</h5>
      <Link
        className={`${styles.link} material-symbols-outlined`}
        href="/"
      >arrow_outward</Link>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.location}>
        {locations?.map((location, index) => (
          <span key={index}>
            {location?.city}
            {index < locations.length - 1 && ', '}
          </span>
        ))}
      </div>
    </li>
  )
}