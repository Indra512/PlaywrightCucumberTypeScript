module.exports = {
        default: {
            tags: process.env.npm_config_TAGS || "",
            formatOptions: {
                snippetInterface: "async-await"
            },
            paths: [
                "src/test/features/*.feature"
            ],
            publishQuite: true,
            dryRun: false,
            require: [
                "src/test/steps_definitions/*.ts",
                "src/test/hooks/hooks.ts"
            ],
            format: [
                "html:test-results/cucumber-report.html",
                "json:test-results/cucumber-report.json",
                "junit:test-reports/cucumber-report.xml"
            ],
            requireModule: [
                "ts-node/register"
            ]
        }
}
