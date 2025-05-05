module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require src/test/steps_definitions/*.ts",
    "--require src/test/hooks/hooks.ts",
    "--format html:test-results/cucumber-report.html",
    "--format json:test-results/cucumber-report.json",
    "--format junit:test-results/cucumber-report.xml",
    "--publish-quiet",
    "--dry-run false",
   // --tags process.env.npm_config_TAGS || "",
    "--format-options '{\"snippetInterface\": \"async-await\"}'",
    "src/test/features/*.feature"
  ].join(" ")
};
