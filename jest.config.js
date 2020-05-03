// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: [
    'js', 'json', 'ts', 'vue'
  ],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts$": "ts-jest"
  },
  snapshotSerializers: ['jest-serializer-vue'],
  moduleDirectories: [
    'node_modules'
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
};
