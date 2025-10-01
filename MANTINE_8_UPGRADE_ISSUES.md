# Mantine 8.x Upgrade Issues & Findings

## Summary
This document details the issues encountered while upgrading from Mantine 7.x to Mantine 8.x and the attempted solutions.

## Timeline of Changes

### Initial Upgrade (commit: 08a4b08)
- Upgraded `@mantine/core` from 7.x to 8.2.8
- Upgraded `@mantine/hooks` from 7.x to 8.2.8
- Upgraded Vite from previous version to 7.1.4
- Upgraded React to 19.1.1

### Package Manager
- Initially used Yarn 4.0.1
- Switched to npm for simpler CI/CD integration (commit: 332d807)
- **Decision: Correct choice** - npm is built into Node.js, requires no extra installation steps

## Issues Encountered

### 1. Node.js Version Requirement
**Error**: `You are using Node.js 18.20.8. Vite requires Node.js version 20.19+ or 22.12+`

**Root Cause**:
- Vite 7.x requires Node.js 20.19+ or 22.12+
- Azure Static Web Apps Oryx build system defaulted to Node.js 18.x
- Local environment was on Node.js 22.19.0 (working fine)

**Attempted Solutions**:
1. Set `NODE_VERSION: '22'` environment variable in Azure action
2. Added `actions/setup-node@v4` with `node-version: '22'`

**Result**: Oryx continued to use its own Node.js version, ignoring runner's Node.js setup.

### 2. Rollup Optional Dependencies Bug
**Error**: `Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies`

**Root Cause**:
- npm has a known bug with optional dependencies ([npm/cli#4828](https://github.com/npm/cli/issues/4828))
- Rollup uses platform-specific optional binaries
- `npm ci` and `npm ci --include=optional` both failed to install the Linux x64 binary properly

**Attempted Solutions**:
1. `npm ci --include=optional` - Failed
2. Setting `NODE_VERSION` for Oryx to use Node 22 - Still hit Rollup issue
3. Pre-installing dependencies before Azure action - Failed (Oryx re-ran npm install)

**Working Solution**:
```bash
npm ci
npm install @rollup/rollup-linux-x64-gnu --force
```
Explicitly installing the platform-specific binary after `npm ci` resolved the issue.

### 3. Azure Static Web Apps File Count Limit
**Error**: `The content server has rejected the request with: BadRequest. Reason: The number of static files was too large.`

**Root Cause**:
- Used `skip_app_build: true` to bypass Oryx's build issues
- Built the app manually in GitHub Actions
- Azure tried to upload entire workspace including `node_modules/` (thousands of files)
- Azure Static Web Apps has a file count limit

**No Solution Implemented**: This is where we stopped.

**Potential Solutions**:
1. Configure `.staticwebapp.config.json` to exclude `node_modules/`
2. Only upload the `dist/` folder explicitly
3. Let Oryx handle the build with properly installed dependencies

## Final Working Configuration

### GitHub Actions Workflow
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'

- name: Install dependencies
  run: |
    npm ci
    npm install @rollup/rollup-linux-x64-gnu --force

- name: Build application
  run: npm run build

- name: Deploy to Azure Static Web Apps
  uses: Azure/static-web-apps-deploy@v1
  with:
    skip_app_build: true
    output_location: "dist"
```

**Status**: Build succeeds ✅, Deployment fails due to file count ❌

## Recommendations

### Option 1: Continue with Manual Build
- Add proper exclusions to prevent uploading `node_modules/`
- Keep the working Rollup fix
- Maintain control over Node.js version

### Option 2: Revert to Mantine 7.x
- Revert to commit before `08a4b08`
- Wait for npm to fix optional dependencies bug
- Wait for Vite to support older Node.js versions OR upgrade Azure to use Node.js 22 by default

### Option 3: Alternative Build Approach
- Build locally/in pipeline with proper Node.js 22
- Use a different deployment method that only uploads `dist/`
- Consider using Azure Static Web Apps CLI directly

## Key Learnings

1. **Vite 7.x has strict Node.js requirements** - Requires Node.js 20.19+ or 22.12+
2. **npm has a known bug with optional dependencies** - Workaround: explicitly install platform binaries
3. **Azure Oryx uses its own Node.js version** - Setting `NODE_VERSION` env var tells Oryx which version to use
4. **Package manager choice (Yarn vs npm) was irrelevant** - Both would have hit the same issues
5. **`skip_app_build: true` requires careful file management** - Azure will try to upload everything

## References
- npm optional dependencies bug: https://github.com/npm/cli/issues/4828
- Vite 7 Node.js requirements: Requires Node.js 20.19+ or 22.12+
- Azure Static Web Apps docs: https://docs.microsoft.com/en-us/azure/static-web-apps/

## Related Commits
- `08a4b08` - chore: update mantine dependencies
- `332d807` - chore: fix package mismmatch
- `ebc5a8f` - chore: addind ci install dependecy logic
- `edb2617` - chore: use LF line feed and node 22
- `070e8bc` - chore: revert manual overide, aim to get node 22 working
- `1753b9f` - chore: another infra depency fix
- `4340b65` - chore: changing build order in pipeline

## Decision
**Revert to Mantine 7.x** until a cleaner solution can be implemented without CI/CD complications.
