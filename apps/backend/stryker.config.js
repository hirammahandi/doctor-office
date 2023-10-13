module.exports = {
  testRunner: "jest",
  packageManager: "npm",
  inPlace: false,
  reporters: ["html", "clear-text", "progress"],
  coverageAnalysis: "perTest",
  tsconfigFile: "./apps/backend/tsconfig.spec.json",
  mutate: [
    "./apps/backend/src/**/*.ts",
    "!./apps/backend/src/**/*.spec.ts",
    "!./apps/backend/src/environments/**/*",
    "!./apps/backend/src/main.ts",
  ],
  ignorePatterns: ["dist", "coverage", "node_modules"],
  plugins: ["@stryker-mutator/jest-runner"],
  disableTypeChecks: "./**/*.{js,ts,jsx,tsx,html,vue}",
  jest: {
    projectType: "custom",
    configFile: "./apps/backend/jest.config.js",
    enableFindRelatedTests: true,
  },
  commandRunner: { command: "nx test backend" },
  buildCommand: "nx build backend",
  ignoreStatic: true,
  htmlReporter: {
    fileName: "dist/reports/mutation/html/apps/backend/stryker.html",
  },
  tempDirName: "stryker-tmp",
};
