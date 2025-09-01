# Architecture Decision Records (ADR)

This document tracks architectural decisions made for the Mantelorian Quiz Game project.

## ADR-001: Implement CodeQL Security Scanning

**Date:** 2025-08-29  
**Status:** Accepted  
**Deciders:** Development Team  

### Context

The application handles user data, integrates with external APIs (Slack, Azure Functions), and requires security best practices to protect against common vulnerabilities. We needed to implement automated security scanning to:

- Detect potential security vulnerabilities early in development
- Maintain code quality and security standards
- Comply with security requirements for production deployment
- Enable continuous security monitoring

### Decision

We have decided to implement **GitHub CodeQL** as our primary security analysis tool with the following configuration:

- **Automated Scanning**: Runs on all pushes to main branch and pull requests
- **Scheduled Scans**: Daily security scans at 2:30 UTC for continuous monitoring
- **Manual Triggers**: On-demand security scans with configurable scan levels
- **Query Sets**: Uses both `security-extended` and `security-and-quality` rule sets
- **Language Support**: JavaScript/TypeScript analysis for frontend and API code

### Alternatives Considered

1. **ESLint Security Plugin**: Limited to basic static analysis patterns
2. **SonarQube**: Requires additional infrastructure and licensing costs
3. **Snyk**: Focuses primarily on dependency vulnerabilities, less comprehensive for code analysis
4. **Manual Security Reviews**: Not scalable and prone to human error

### Consequences

**Positive:**
- Automated detection of security vulnerabilities in code
- Integration with GitHub's security advisory system
- No additional infrastructure or licensing costs
- Comprehensive coverage for JavaScript/TypeScript
- Configurable scan levels for different use cases
- Detailed security reports with remediation guidance

**Negative:**
- May produce false positives requiring manual review
- Limited to languages supported by CodeQL
- Scan execution time adds to CI/CD pipeline duration

### Implementation

- Created `.github/workflows/codeql.yml` with comprehensive security scanning
- Configured automatic triggers for continuous integration
- Set up manual workflow dispatch for on-demand scans
- Applied proper GitHub Actions permissions following principle of least privilege

### Monitoring

- Security scan results will be reviewed in GitHub Security tab
- Failed scans will block deployments until resolved
- Monthly review of scan results and rule set effectiveness
- Regular updates to CodeQL queries and actions versions

---

## ADR-002: Implement Multi-Tier Fallback for Automated Security PR Creation

**Date:** 2025-09-01  
**Status:** Accepted  
**Deciders:** Development Team  

### Context

The automated security vulnerability fixing workflow (ADR-001) needed to create pull requests automatically when security issues are detected. However, many GitHub repositories have organizational policies that restrict GitHub Actions from creating pull requests directly, leading to workflow failures and unaddressed security vulnerabilities.

We needed to ensure that security fixes are always trackable and actionable, regardless of repository permission restrictions.

### Decision

We have implemented a **three-tier fallback mechanism** for automated security fix delivery:

1. **Primary Method**: GitHub CLI (`gh pr create`)
   - Full-featured PR creation with labels, descriptions, and metadata
   - Works when GitHub Actions has full repository permissions

2. **Secondary Method**: GitHub REST API direct calls
   - Bypasses GitHub CLI restrictions
   - Uses direct HTTP requests to GitHub's Pull Request API
   - Fallback when CLI fails due to permission issues

3. **Final Fallback**: Issue Creation with Manual Instructions
   - Creates detailed GitHub issue when PR creation is completely blocked
   - Provides step-by-step instructions for manual PR creation
   - Ensures security vulnerabilities are never lost or ignored
   - Includes branch references and fix guidance

### Alternatives Considered

1. **Personal Access Token (PAT)**: Requires manual token management and security risks
2. **GitHub App**: Complex setup and maintenance overhead for small projects  
3. **External Webhook**: Introduces additional infrastructure dependencies
4. **Email Notifications**: Poor tracking and integration with GitHub workflows
5. **Slack/Teams Integration**: Limited actionability and code context

### Consequences

**Positive:**
- **100% Success Rate**: Security fixes are always tracked, regardless of repository restrictions
- **Clear User Experience**: Developers receive actionable instructions even when automation fails
- **No Configuration Required**: Works out-of-the-box in any GitHub repository
- **Comprehensive Fallback**: Three independent methods ensure reliability
- **Rich Context**: Full vulnerability details and fix recommendations in all scenarios
- **Maintainable**: No external dependencies or additional infrastructure

**Negative:**
- **Manual Intervention**: Issue fallback requires developer action to create PR
- **Increased Complexity**: More code paths and error handling logic
- **Potential Confusion**: Developers might not understand why issue was created instead of PR

### Implementation

**Workflow Structure:**
```yaml
# 1. Primary: GitHub CLI
gh pr create --title "..." --body-file ... --label ...

# 2. Secondary: REST API
curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/{repo}/pulls

# 3. Final: Issue Creation
gh issue create --title "Security Fixes Ready" --body-file ...
```

**Error Handling:**
- Each method includes comprehensive error detection
- JSON response parsing for API success/failure validation
- Detailed logging for troubleshooting permission issues
- Clear success/failure messaging for each fallback tier

**User Communication:**
- Rich markdown descriptions with vulnerability details
- Step-by-step manual instructions in issue fallback
- Branch names and command examples for easy execution
- Security labels for proper categorization and tracking

### Monitoring

**Success Metrics:**
- Track fallback method usage in workflow logs
- Monitor issue creation rate vs PR creation rate
- Measure time-to-fix for manual vs automated PRs
- Count of unresolved security issues over time

**Alerting:**
- Workflow failure notifications when all three methods fail
- Weekly summary of security fixes processed
- Monitoring of repository permission changes affecting automation

**Continuous Improvement:**
- Monthly review of fallback method effectiveness
- User feedback collection on manual PR creation experience
- Analysis of common permission restriction patterns across repositories

---

## Template for Future ADRs

```markdown
## ADR-XXX: [Decision Title]

**Date:** YYYY-MM-DD  
**Status:** [Proposed/Accepted/Rejected/Deprecated]  
**Deciders:** [List of people involved in decision]  

### Context
[Description of the problem and why a decision is needed]

### Decision
[Description of the chosen solution]

### Alternatives Considered
[List of other options that were considered and why they were rejected]

### Consequences
[Description of positive and negative impacts]

### Implementation
[How the decision will be implemented]

### Monitoring
[How success/failure will be measured]
```