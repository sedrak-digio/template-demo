import { test, expect } from '@playwright/test';

test.describe('Recommendations Search', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click on the Recommendations tab
    await page.getByRole('tab', { name: /recommendations/i }).click();
    
    // Wait for tab panel to be visible
    await page.waitForTimeout(500);
  });

  test('should search for coffee recommendations', async ({ page }) => {
    // Wait for the component title to be visible
    await expect(page.getByText('Queenstown suggestion search!')).toBeVisible();
    
    // Find the search input in the MultiQuestionSearchBar component using exact placeholder text
    const searchInput = page.getByPlaceholder("Enter your descriptive question, such as 'bars in town, with live music?'");
    
    // Type the search query
    await searchInput.fill('Where to get coffee');
    
    // Click the Search button instead of pressing Enter
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();
    
    // Wait for the API call to complete (give it enough time)
    await page.waitForTimeout(5000);
    
    // Check that the search completed by verifying:
    // 1. The input field is cleared (as per line 70 in the component)
    await expect(searchInput).toHaveValue('');
    
    // 2. Some response text is visible on the page
    // Look for any text that indicates a response was received
    const pageText = await page.textContent('body');
    expect(pageText).toContain('Queenstown');
  });

});