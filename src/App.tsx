import "@mantine/core/styles.css";
import { Container, MantineProvider, Stack, Tabs, Title } from "@mantine/core";
import { theme } from "./theme";

// Import your page components
import MultiQuestionSearchBar from "./components/QuestionSearchBar/QuestionSearchBar";
import QuizGame from "./components/QuizGame";

// Optional: Import icons for the tabs for a nicer UI
import { IconUserSearch, IconBulb } from '@tabler/icons-react';


export default function App() {
  return (
    <MantineProvider theme={theme}>
      {/* Notifications provider is still needed for the QuizGame */}

      <Container my="xl">
        <Stack gap="xl">
          {/* 1. The main header for the page */}
          <Title order={1} ta="center">
            Queenstown 2025!
          </Title>

          {/* 2. The Tabs component wrapper */}
          <Tabs defaultValue="guess-who" variant="outline" radius="md">
            {/* The list of clickable tab controls */}
            <Tabs.List grow>
              <Tabs.Tab value="guess-who" leftSection={<IconUserSearch size={16} />}>
                Guess who?
              </Tabs.Tab>
              <Tabs.Tab value="recommendations" leftSection={<IconBulb size={16} />}>
                Recommendations
              </Tabs.Tab>
            </Tabs.List>

            {/* The content panel for the "Guess who?" tab */}
            <Tabs.Panel value="guess-who" pt="xs">
              <QuizGame />
            </Tabs.Panel>

            {/* The content panel for the "Recommendations" tab */}
            <Tabs.Panel value="recommendations" pt="xs">
              <MultiQuestionSearchBar />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </MantineProvider>
  );
}