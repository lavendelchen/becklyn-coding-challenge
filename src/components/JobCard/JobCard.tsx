import styles from "./JobCard.module.css";
import Link from "next/link";

interface JobCardProps {
  key: number;
  department: {
    __typename?: "JobDepartment";
    title?: string | null;
  } | null | undefined,
  title: string | null | undefined,
  locations: {
    __typename?: "JobLocationsCollection";
    total: number;
    items: Array<{
        __typename?: "ContentTypeLocation";
        city?: string | null;
    } | null>;
  } | null | undefined,
  types: {
    __typename?: "JobTypesCollection";
    total: number;
    items: Array<{
        __typename?: "JobType";
        title?: string | null;
    } | null>;
  } | null | undefined
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
    </li>
  )
}