# Playwright + Cucumber + TypeScript Test Automation Framework

## Overview
This framework is built using **Playwright**, **Cucumber**, and **TypeScript** to provide a robust and scalable solution for end-to-end test automation. It supports **parallel execution**, **retry mechanism**, **logging**, and **multi-environment test execution**.

### Key Features
- **Playwright**: Ensures fast and reliable browser automation.
- **Cucumber**: Enables behavior-driven development (BDD) with readable test scenarios.
- **TypeScript**: Provides type safety and modern JavaScript features.
- **Reporting**: Generates Cucumber reports with screenshots and videos attached for failed tests.
- **Logging**: Uses Winston for structured logging.
- **Environment Management**: Supports running tests in multiple environments.
- **Retry Mechanism**: Retries failed tests automatically.

---

## Tech Stack
### 1. Playwright
[Playwright](https://playwright.dev/) is a modern automation library that supports multiple browsers (Chromium, Firefox, WebKit) and provides robust testing capabilities.

### 2. Cucumber
[Cucumber](https://cucumber.io/) allows writing test scenarios in Gherkin syntax, making them easy to understand and maintain.

### 3. TypeScript
[TypeScript](https://www.typescriptlang.org/) brings static typing to JavaScript, improving maintainability and reducing errors.

---

## Dependencies
This framework utilizes the following dependencies:

```json
"dependencies": {
  "@cucumber/cucumber": "^11.2.0",
  "@playwright/test": "^1.50.1",
  "@types/node": "^22.13.5",
  "cross-env": "^7.0.3",
  "dotenv": "^16.4.7",
  "fs-extra": "^11.3.0",
  "ts-node": "^10.9.2",
  "winston": "^3.17.0"
}
```

- **@cucumber/cucumber**: Cucumber framework for BDD testing.
- **@playwright/test**: Playwright testing library.
- **@types/node**: Type definitions for Node.js.
- **cross-env**: Enables setting environment variables across platforms.
- **dotenv**: Loads environment variables from `.env` files.
- **fs-extra**: Provides additional filesystem utilities.
- **ts-node**: Enables running TypeScript files directly.
- **winston**: A powerful logging library for better debugging.

---

## Project Structure
* src -> Contains all the features & Typescript code
* test-results -> Contains all the reports related file

## Running Tests
To execute the tests, use the following command:

```sh
npm test run
```

This command will:
- Run Playwright tests using Cucumber.
- Capture screenshots and videos for failures.
- Generate reports after execution.

### Running Tests in Parallel
The framework is designed to support parallel execution, improving test efficiency.

### Retry Mechanism
If a test fails, it will automatically retry based on the configured retry settings.

### Running Tests in Different Environments
You can configure multiple environments using `.env` files and switch between them using `cross-env`.

---

## Reporting
This framework utilizes the **default Cucumber report**, which includes:
- Detailed step execution results.
- Screenshots and videos attached for failures.

---

## Logging
Logging is implemented using **Winston**, which provides structured logs to help debug test failures effectively.

---

## Final Thoughts
This framework provides a strong foundation for **scalable and maintainable** test automation using modern tools and best practices. With **parallel execution, retry mechanisms, and multi-environment support**, it ensures reliability and efficiency in automated testing.

Feel free to contribute, enhance, or modify this framework as needed!

Happy Testing! 🚀

