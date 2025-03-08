import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    testMatch: ["<rootDir>/tests/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    verbose: true,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};

export default config;