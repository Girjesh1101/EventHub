# EventHub Playwright Automation

This project contains Playwright-based UI and API automation tests for the EventHub application.

## Tech Stack

- Playwright
- TypeScript
- dotenv for environment configuration
- Page Object Model (POM)

## Project Structure

```text
.
├── api/
│   ├── apiFactory.ts
│   ├── AuthClient.ts
│   ├── bookingAPI.ts
│   └── eventAPI.ts
├── config/
│   └── config.ts
├── constructor/
│   ├── Booking/
│   ├── events/
│   └── login/
├── fixture/
│   └── testFixture.ts
├── module/
├── pages/
├── runner/
│   └── testRunner.ts
├── tests/
│   ├── api/
│   ├── ui/
│   ├── e2e.spec.ts
│   └── e2eAPI.spec.ts
├── .env
├── .env.qa
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Environment Configuration

The project uses a centralized environment config file at `config/config.ts` and loads values from `.env` or `.env.<environment>`.

Example:

```env
ENV=qa
UI_BASE_URL=https://eventhub.rahulshettyacademy.com
API_BASE_URL=https://api.eventhub.rahulshettyacademy.com
EMAIL=prem@yopmail.com
PASSWORD=Automation@2026
```

By default, the suite uses `qa` environment if `ENV` is not set.

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific file

```bash
npx playwright test tests/ui/login.spec.ts
```

### Run API tests only

```bash
npx playwright test tests/api
```

### Run E2E tests only

```bash
npx playwright test tests/e2e.spec.ts
```

## Custom Test Runner

A simple runner is available in `runner/testRunner.ts`.

### Usage

```bash
npx tsx runner/testRunner.ts --env=qa --suite=all
npx tsx runner/testRunner.ts --env=qa --suite=api
npx tsx runner/testRunner.ts --env=qa --suite=e2e
```

### Supported values

- `--env` : environment name such as `qa`, `dev`
- `--suite` : `all`, `api`, or `e2e`

## Playwright Config

The main Playwright config is in `playwright.config.ts`.

Key settings:

- `testDir: ./tests`
- parallel execution enabled
- HTML reporter enabled
- base URL loaded from environment config

## Notes

- Keep credentials and URLs in environment files instead of hardcoding them in test files.
- Use page objects for UI interactions.
- Keep API logic in dedicated API classes under `api/`.
- Use fixtures for shared setup such as login and API token creation.

## Example Commands

```bash
npm test
npm run e2e
npm run test:qa
```
