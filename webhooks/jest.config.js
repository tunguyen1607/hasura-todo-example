module.exports = {
  preset: 'ts-jest',
  roots: [
    "./tests"
  ],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testMatch: [
    '<rootDir>/tests/**/*.js',
    '<rootDir>/tests/**/*.ts',
  ],
};
