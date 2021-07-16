module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@config": "<rootDir>/src/config/",
  },
};