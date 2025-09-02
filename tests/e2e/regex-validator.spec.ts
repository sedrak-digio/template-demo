import { test, expect } from '@playwright/test';

test.describe('Regex Validator Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to Regex Validator component', async ({ page }) => {
    // Look for Regex Validator in navigation or as a component
    const regexValidatorLink = page.getByText('Regex Validator', { exact: false });
    
    if (await regexValidatorLink.isVisible()) {
      await regexValidatorLink.click();
    }
    
    // Verify the component is loaded
    const validatorCard = page.locator('[data-testid="regex-validator"], .regex-validator').first();
    const cardWithText = page.locator('text=/Regex Validator.*Security Test/i');
    
    // Check if either selector finds the component
    const isVisible = await validatorCard.isVisible() || await cardWithText.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should validate a simple pattern successfully', async ({ page }) => {
    // Navigate to Regex Validator
    const regexValidatorLink = page.getByText('Regex Validator', { exact: false });
    if (await regexValidatorLink.isVisible()) {
      await regexValidatorLink.click();
    }

    // Find the input field
    const input = page.getByPlaceholder(/enter|type|test|input/i).first();
    await input.fill('aaaaab'); // This should match the pattern
    
    // Find and click the validate button
    const validateButton = page.getByRole('button', { name: /validate|test|check/i }).first();
    await validateButton.click();
    
    // Wait for validation result
    await page.waitForTimeout(1000);
    
    // Check for success message
    const resultText = await page.textContent('body');
    expect(resultText).toContain('passed');
    
    // Verify timing is displayed
    expect(resultText).toMatch(/\d+ms/);
  });

  test('should handle ReDoS vulnerability testing', async ({ page }) => {
    // Navigate to Regex Validator
    const regexValidatorLink = page.getByText('Regex Validator', { exact: false });
    if (await regexValidatorLink.isVisible()) {
      await regexValidatorLink.click();
    }

    // Input a string that could cause ReDoS (many 'a's)
    const input = page.getByPlaceholder(/enter|type|test|input/i).first();
    const redosTestString = 'a'.repeat(30) + 'b'; // Could cause exponential backtracking
    await input.fill(redosTestString);
    
    // Click validate
    const validateButton = page.getByRole('button', { name: /validate|test|check/i }).first();
    await validateButton.click();
    
    // Wait for result with timeout (ReDoS might take time)
    await page.waitForTimeout(2000);
    
    // Check that validation completes (doesn't hang)
    const resultText = await page.textContent('body');
    
    // Should show either passed/failed and timing
    const hasResult = resultText?.includes('passed') || resultText?.includes('failed');
    expect(hasResult).toBeTruthy();
    
    // Verify timing is displayed
    expect(resultText).toMatch(/\d+ms/);
  });

  test('should validate email patterns', async ({ page }) => {
    // Navigate to Regex Validator
    const regexValidatorLink = page.getByText('Regex Validator', { exact: false });
    if (await regexValidatorLink.isVisible()) {
      await regexValidatorLink.click();
    }

    // Test with an email
    const input = page.getByPlaceholder(/enter|type|test|input/i).first();
    await input.fill('test@example.com');
    
    // Look for email validation button if separate
    const emailButton = page.getByRole('button', { name: /email/i });
    
    if (await emailButton.isVisible()) {
      await emailButton.click();
    } else {
      // Use general validate button
      const validateButton = page.getByRole('button', { name: /validate|test|check/i }).first();
      await validateButton.click();
    }
    
    // Wait for result
    await page.waitForTimeout(1000);
    
    // Check for validation result
    const resultText = await page.textContent('body');
    expect(resultText).toMatch(/(email|validation).*(passed|failed)/i);
  });

  test('should handle pattern validation', async ({ page }) => {
    // Navigate to Regex Validator  
    const regexValidatorLink = page.get
