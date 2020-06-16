
module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["./src/test-setup.js"],
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ]
};