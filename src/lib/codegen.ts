import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config();

const endpoint = process.env.NEXT_PUBLIC_CONTENTFUL_ENDPOINT;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const config: CodegenConfig = {
  schema: `${endpoint}?access_token=${accessToken}`,
  documents: "src/lib/query.ts",
  generates: {
    [resolve(__dirname, '../types/graphql.ts')]: {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ]
    }
  }
};

export default config;
