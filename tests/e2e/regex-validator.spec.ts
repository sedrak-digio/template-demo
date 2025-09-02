import { test, expect } from '@playwright/test';

test.describe('Regex Validator Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click on the Regex Test tab
    await page.getByRole('tab', { name: /regex test/i }).click();
    
    // Wait for tab panel to be visible
    await page.waitForTimeout(500);
  });

  test('should load the Regex Validator component', async ({ page }) => {
    // Verify the component loaded by checking for its title
    const componentTitle = page.getByText('Regex Validator', { exact: false });
    await expect(componentTitle).toBeVisible();
    
    // Verify input field is present
    const input = page.getByRole('textbox').first();
    await expect(input).toBeVisible();
  });

  test('should validate a simple pattern', async ({ page }) => {
    // Find the input field
    const input = page.getByRole('textbox').first();
    await input.fill('aaaaab');
    
    // Find and click the first validate button
    const validateButton = page.getByRole('button').filter({ hasText: /validate|test/i }).first();
    await validateButton.click();
    
    // Wait for validation
    await page.waitForTimeout(1000);
    
    // Check that some result appears
    const pageText = await page.textContent('body');
    const hasValidationResult = pageText.includes('passed') || pageText.includes('failed') || pageText.includes('ms');
    expect(hasValidationResult).toBeTruthy();
  });

  test('should handle ReDoS test input', async ({ page }) => {
    // Test with a potentially problematic string
    const input = page.getByRole('textbox').first();
    const testString = 'a'.repeat(20) + 'b';
    await input.fill(testString);
    
    // Click validate button
    const validateButton = page.getByRole('button').filter({ hasText: /validate|test/i }).first();
    await validateButton.click();
    
    // Wait for validation (with timeout for ReDoS)
    await page.waitForTimeout(2000);
    
    // Verify the page is still responsive
    const pageText = await page.textContent('body');
    expect(pageText).toContain('Regex Validator');
    
    // Should show some timing result
    const hasTimingInfo = pageText.includes('ms');
    expect(hasTimingInfo).toBeTruthy();
  });

  test('should validate email patterns', async ({ page }) => {
    // Enter an email address
    const input = page.getByRole('textbox').first();
    await input.fill('test@example.com');
    
    // Look for email validation button or use general validate
    const emailButton = page.getByRole('button').filter({ hasText: /email/i }).first();
    
    if (await emailButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await emailButton.click();
    } else {
      // Use general validate button
      const validateButton = page.getByRole('button').filter({ hasText: /validate|test/i }).first();
      await validateButton.click();
    }
    
    // Wait for result
    await page.waitForTimeout(1000);
    
    // Check for validation output
    const pageText = await page.textContent('body');
    const hasResult = pageText.includes('validation') || pageText.includes('ms');
    expect(hasResult).toBeTruthy();
  });
});