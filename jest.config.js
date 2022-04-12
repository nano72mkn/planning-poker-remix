/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.test.json",
    },
  },
};
