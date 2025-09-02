import { test, expect } from '@playwright/test';

test.describe('Recommendations Search', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('should search for coffee recommendations', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Look for and click on Recommendations section/button
    // First, let's see if there's a navigation or direct component
    const recommendationsButton = page.getByText('Recommendations', { exact: false });
    
    if (await recommendationsButton.isVisible()) {
      await recommendationsButton.click();
    }

    // Find the search input field
    // This assumes there's a search bar for recommendations
    const searchInput = page.getByPlaceholder(/search|type|enter/i).first();
    
    // Type the search query
    await searchInput.fill('Where to get coffee');
    
    // Press Enter or click search button
    await searchInput.press('Enter');
    
    // Wait for search results
    await page.waitForTimeout(2000); // Wait for API response
    
    // Verify that results are displayed
    // Check for results container or specific result elements
    const results = page.locator('[data-testid="recommendations-results"], .recommendations-results, .results');
    
    // Verify results are visible
    await expect(results).toBeVisible({ timeout: 10000 });
    
    // Optionally verify that coffee-related content appears
    const pageContent = await page.textContent('body');
    
    // Check if coffee-related terms appear in results
    const coffeeRelatedTerms = ['coffee', 'cafe', 'espresso', 'latte', 'brew'];
    const hasRelevantContent = coffeeRelatedTerms.some(term => 
      pageContent?.toLowerCase().includes(term)
    );
    
    expect(hasRelevantContent).toBeTruthy();
  });

  test('should display search results properly', async ({ page }) => {
    // Navigate to recommendations if needed
    const recommendationsButton = page.getByText('Recommendations', { exact: false });
    
    if (await recommendationsButton.isVisible()) {
      await recommendationsButton.click();
    }

    // Search for coffee
    const searchInput = page.getByPlaceholder(/search|type|enter/i).first();
    await searchInput.fill('Where to get coffee');
    await searchInput.press('Enter');
    
    // Wait for results
    await page.waitForTimeout(2000);
    
    // Check that the search input retains the value
    await expect(searchInput).toHaveValue('Where to get coffee');
    
    // Verify UI elements are present
    const resultsSection = page.locator('section, div').filter({ hasText: /result|recommendation/i }).first();
    await expect(resultsSection).toBeVisible({ timeout: 10000 });
  });

  test('should handle empty search gracefully', async ({ page }) => {
    // Navigate to recommendations if needed  
    const recommendationsButton = page.getByText('Recommendations', { exact: false });
    
    if (await recommendationsButton.isVisible()) {
      await recommendationsButton.click();
    }

    // Try searching with empty string
    const searchInput = page.getByPlaceholder(/search|type|enter/i).first();
    await searchInput.fill('');
    await searchInput.press('Enter');
    
    // Should either show a message or not break the UI
    await page.waitForTimeout(1000);
    
    // Page should still be functional
    const pageTitle = page.locator('h1, h2, h3').first();
    await expect(pageTitle).toBeVisible();
  });
});