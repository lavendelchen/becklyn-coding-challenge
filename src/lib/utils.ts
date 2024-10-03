import { JobItems } from "@/types/graphqlAdditional";

export function getFilterContent(jobs: JobItems) {
  const filterContent = {
    departments: new Set<string>(),
    cities: new Set<string>(),
    levels: new Set<string>()
  };
  
  jobs.forEach((job) => {
    if (job?.department?.title) {
      filterContent.departments.add(job.department.title);
    }

    if (job) {
      job.locationsCollection?.items.forEach((location) => {
        if (location?.city) {
          filterContent.cities.add(location.city);
        }
      });

      job.levelsCollection?.items.forEach((level) => {
        if (level?.title) {
          filterContent.levels.add(level.title);
        }
      });
    }
  })

  return filterContent;
}