import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  rootDir: "./src",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {}],
  },
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!uuid)"],
};

export default config;
