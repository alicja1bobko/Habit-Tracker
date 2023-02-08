import { defaults } from "jest-config";

const config = {
  collectCoverage: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};

export default config;
