export type JobItems = Array<{
  __typename?: 'Job',
  name?: string | null,
  title?: string | null,
  department?: {
    __typename?: 'JobDepartment',
    title?: string | null
  } | null,
  locationsCollection?: {
    __typename?: 'JobLocationsCollection',
    total: number,
    items: Array<{
      __typename?: 'ContentTypeLocation',
      city?: string | null
    } | null>
  } | null,
  typesCollection?: {
    __typename?: 'JobTypesCollection',
    total: number,
    items: Array<{
      __typename?: 'JobType',
      title?: string | null
    } | null>
  } | null,
  levelsCollection?: {
    __typename?: "JobLevelsCollection";
    total: number;
    items: Array<{
        __typename?: "JobLevel";
        title?: string | null;
    } | null>;
  } | null;
} | null>
