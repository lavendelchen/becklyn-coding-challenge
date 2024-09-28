"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/lib/apolloClient";

const client = createApolloClient();

export default function ApolloProviderWrapper({ children }:
  { children: React.ReactNode }
) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
