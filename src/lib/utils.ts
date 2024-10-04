import { JobItems } from "@/types/graphqlAdditional";

export interface FilterContent {
  departments: string[];
  cities: string[];
  levels: string[];
}

export function getFilterContent(jobs: JobItems) {
  const departments = new Set<string>();
  const cities = new Set<string>();
  const levels = new Set<string>();
  
  jobs.forEach((job) => {
    if (job?.department?.title) {
      departments.add(job.department.title);
    }

    if (job) {
      job.locationsCollection?.items.forEach((location) => {
        if (location?.city) {
          cities.add(location.city);
        }
      });

      job.levelsCollection?.items.forEach((level) => {
        if (level?.title) {
          levels.add(level.title);
        }
      });
    }
  })

  const filterContent: FilterContent = {
    departments: Array.from(departments),
    cities: Array.from(cities),
    levels: Array.from(levels),
  }

  const alphabetically = (a: string, b: string) => (
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  filterContent.departments.sort(alphabetically);
  filterContent.cities.sort(alphabetically);
  filterContent.levels.sort(alphabetically);

  return filterContent;
}
