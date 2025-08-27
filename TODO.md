# TODO - Mantelorian Quiz Game

## Completed Tasks ✅

### Card Component Implementation (2025-08-27)
- [x] Examined current quiz game structure and end state (`src/components/QuizGame/index.tsx`)
- [x] Created Mantelorians card component with Mantine (`src/components/QuizGame/MantelorianCards.tsx`)
  - Used `SimpleGrid` for responsive layout (1-4 columns)
  - Each member displayed in a `Card` with avatar, name, and "Mantelorian" badge
  - Clean, centered layout with proper spacing
- [x] Integrated card component into end state (`src/components/QuizGame/index.tsx:116-117`)
  - Replaced simple badge list with new card component
  - Added descriptive heading "Mantelorians You've Guessed:"
  - Updated to full width layout for better card display
- [x] Make avatars bigger and reduce columns to 3 (`src/components/QuizGame/MantelorianCards.tsx:27,35`)
  - Increased avatar size from 80px to 120px
  - Reduced grid from 4 columns max to 3 columns max
- [x] Make cards consume full column width and increase avatar size (`src/components/QuizGame/MantelorianCards.tsx:32-40`)
  - Cards now use full height (`h="100%"`) to consume available column space
  - Increased avatar size from 120px to 150px
  - Increased spacing and padding for better visual balance
  - Stack content is centered vertically within full height cards
- [x] Add Slack deeplinks using sId from HPP interface (`src/components/QuizGame/MantelorianCards.tsx:26-29,60-72`)
  - Implemented `getSlackProfileUrl()` function using `https://slack.com/app_redirect?channel=${sId}` format
  - Added Slack icon button next to each member's badge that opens in new tab
  - Used Mantine ActionIcon with IconBrandSlack from Tabler icons
  - Added proper accessibility attributes (title, rel="noopener noreferrer")

## Pending Tasks 📋

### Next Steps
- [ ] Add search/filter bar for mantelorian names
  - Implement text input to filter displayed cards by name
  - Add to the end state component

### Future Enhancements
- [ ] Extend Hpp interface to include location and domain fields
- [ ] Update MantelorianCards to display location and domain information
- [ ] Add filter options for location and domain

## Notes 📝

- The card component uses the existing `Hpp` interface for type safety
- Cards display member avatars at 80px size with rounded corners
- Responsive grid adjusts from 1 column on mobile to 4 columns on large screens
- Maintains the existing game flow and state management