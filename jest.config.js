module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
    '^common/(.*)': '<rootDir>/src/common/$1'
  }
};
