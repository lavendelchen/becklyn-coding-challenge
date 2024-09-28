"use client";

import ApolloProviderWrapper from "./ApolloProviderWrapper";
import JobOverview from "@/components/JobOverview/JobOverview";

export default function Page() {
  return (
    <ApolloProviderWrapper>
      <JobOverview />
    </ApolloProviderWrapper>
  );
}
