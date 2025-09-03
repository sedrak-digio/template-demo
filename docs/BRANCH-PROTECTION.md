# Branch Protection Setup

This guide explains how to configure branch protection rules to require E2E tests to pass before merging PRs.

## Required Status Checks

After implementing the Playwright E2E testing workflow, you can require these tests to pass before any PR can be merged.

### Setting Up Branch Protection

1. **Navigate to Settings**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Select "Branches" from the left sidebar

2. **Add Branch Protection Rule**
   - Click "Add rule" or edit existing rule for `main` branch
   - Enter `main` as the branch name pattern

3. **Configure Protection Settings**

   #### Required Status Checks
   - ✅ Enable "Require status checks to pass before merging"
   - ✅ Enable "Require branches to be up to date before merging"
   - Search and select these status checks:
     - `E2E Tests / Playwright` - Our custom E2E test status
     - `Azure Static Web Apps CI/CD` - Deployment must succeed
     - Any other existing checks you want to keep

   #### Additional Recommended Settings
   - ✅ "Require pull request reviews before merging" (optional)
   - ✅ "Dismiss stale pull request approvals when new commits are pushed"
   - ✅ "Require review from CODEOWNERS" (if using CODEOWNERS file)
   - ✅ "Include administrators" (enforce rules for admins too)

4. **Save Changes**
   - Click "Create" or "Save changes"

## How It Works

### PR Workflow with Status Checks

1. **Developer creates PR** (including security fix PRs)
2. **Azure deploys to staging** → Creates preview environment
3. **E2E Tests run automatically** → Tests the deployed PR
4. **Status check appears on PR**:
   - 🟡 **Pending**: "E2E tests running..."
   - ✅ **Success**: "All E2E tests passed"
   - ❌ **Failure**: "E2E tests failed"
5. **PR can only merge when**:
   - E2E Tests status is ✅ Success
   - All other required checks pass

### Security Fix PRs

For PRs created by the auto-security-fix workflow:
- Branch name: `security-fix/*`
- Tests run automatically after deployment
- Special security-focused test report
- Must pass E2E tests before merge

## Status Check Details

The `E2E Tests / Playwright` status check:
- **Name**: `E2E Tests / Playwright`
- **Created by**: Playwright workflow
- **Triggers on**: Every PR after Azure deployment
- **Tests**: 5 browser configurations
  - Desktop: Chrome, Firefox, Safari
  - Mobile: Chrome (Pixel 5), Safari (iPhone 12)
- **Test target**: Deployed PR preview URL

## Troubleshooting

### Status Check Not Appearing
- Ensure the Playwright workflow has run at least once
- Check that the workflow has proper permissions
- Verify Azure deployment completed successfully

### Tests Failing on Security PRs
- Check the PR comment for specific browser failures
- Review test logs in GitHub Actions
- Verify the security fix doesn't break existing functionality

### Manual Test Trigger
You can manually trigger tests for any deployment:
1. Go to Actions → E2E Tests - Playwright
2. Click "Run workflow"
3. Optionally enter a custom URL to test
4. Click "Run workflow"

## Benefits

✅ **Quality Gate**: No broken code reaches main branch
✅ **Security Validation**: Auto-fixed vulnerabilities are tested
✅ **Cross-browser**: Tests run on 5 different browsers
✅ **Production-like**: Tests run against actual deployed code
✅ **Automated**: No manual testing required

## Related Documentation

- [Playwright Tests](./tests/e2e/README.md)
- [Security Automation](./SECURITY-AUTOMATION.md)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)