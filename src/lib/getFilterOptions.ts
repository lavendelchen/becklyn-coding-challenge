import { JobItems } from "@/types/graphqlAdditional";

export interface FilterOptions {
  departments: string[];
  cities: string[];
  levels: string[];
}

export function getFilterOptions(jobs: JobItems) {
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

  const filterOptions: FilterOptions = {
    departments: Array.from(departments),
    cities: Array.from(cities),
    levels: Array.from(levels),
  }

  const alphabetically = (a: string, b: string) => (
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  filterOptions.departments.sort(alphabetically);
  filterOptions.cities.sort(alphabetically);
  filterOptions.levels.sort(alphabetically);

  return filterOptions;
}
