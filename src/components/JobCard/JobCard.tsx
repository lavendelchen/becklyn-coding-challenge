import styles from "./JobCard.module.css";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return (
    <li className={styles.jobCard} key={key}>
      <h5 className={styles.jobHeader}>
        {department?.title}
      </h5>
      <span
          className="material-symbols-outlined"
          onClick={() =>  router.push('/')}
        > 
          arrow_outward
        </span>
      <h3 className={styles.jobTitle}>{title}</h3>
    </li>
  )
}