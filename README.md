# Queenstown 2025 Demo Application

A Vite + React + TypeScript application with Mantine UI components, featuring recommendation search and regex validation tools.

## Features

- **Queenstown Recommendations**: Search for suggestions and recommendations in Queenstown
- **Regex Validator**: Test and validate regular expressions with ReDoS detection
- **Guess Who Game**: Interactive guessing game
- **File Viewer**: View and explore files

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Testing

### E2E Tests with Playwright

The application includes end-to-end tests using Playwright for critical user flows.

#### Running Tests Locally

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (with browser UI)
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/recommendations.spec.ts

# Run tests for specific browser
npx playwright test --project=chromium
npx playwright test --project="Mobile Safari"
```

#### Test Coverage

- **Recommendations Search**: Tests the Queenstown suggestion search functionality
- **Regex Validator**: Tests regex validation including ReDoS vulnerability detection

#### CI/CD Integration

Tests run automatically on:
- Push to main branch
- Pull requests
- Manual workflow dispatch

The CI pipeline tests on:
- Chromium (Desktop)
- Mobile Safari (iPhone 12)

Test results and artifacts are automatically uploaded and available in GitHub Actions.

## Project Structure

```
src/
├── components/
│   ├── QuestionSearchBar/    # Queenstown recommendations search
│   └── ...other components
├── App.tsx                    # Main application with tab navigation
└── main.tsx                   # Application entry point

tests/
└── e2e/
    ├── recommendations.spec.ts  # Recommendations search tests
    └── regex-validator.spec.ts  # Regex validator tests
```

## Technologies

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://reactjs.org/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Mantine](https://mantine.dev/) - UI component library
- [Playwright](https://playwright.dev/) - E2E testing

## Documentation

### Project Documentation
- [Project Summary](./docs/PROJECT-SUMMARY.md) - Complete project overview
- [Security Automation](./docs/SECURITY-AUTOMATION.md) - AI-powered security pipeline
- [Branch Protection](./docs/BRANCH-PROTECTION.md) - PR protection setup

### External Documentation
- [Mantine Components](https://mantine.dev/core/getting-started/)
- [Playwright Testing](https://playwright.dev/docs/intro)
- [Vite Configuration](https://vitejs.dev/config/)
