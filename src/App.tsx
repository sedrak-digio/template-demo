import "@mantine/core/styles.css";
import { Container, MantineProvider, Stack, Tabs, Title } from "@mantine/core";
import { theme } from "./theme";

// Import your page components
import MultiQuestionSearchBar from "./components/QuestionSearchBar/QuestionSearchBar";
import QuizGame from "./components/QuizGame";
import UserInput from "./components/UserInput/UserInput";
import FileViewer from "./components/FileViewer/FileViewer";
import RegexValidator from "./components/RegexValidator/RegexValidator";
import AboutMe from "./components/AboutMe/AboutMe";
import Experiences from "./components/Experiences/Experiences";

// Optional: Import icons for the tabs for a nicer UI
import { IconUserSearch, IconBulb, IconAlertTriangle, IconFile, IconRegex, IconUser, IconTimeline } from '@tabler/icons-react';


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
              <Tabs.Tab value="test-vulnerability" leftSection={<IconAlertTriangle size={16} />}>
                Test Input (Demo)
              </Tabs.Tab>
              <Tabs.Tab value="file-viewer" leftSection={<IconFile size={16} />}>
                File Viewer (Test)
              </Tabs.Tab>
              <Tabs.Tab value="regex-validator" leftSection={<IconRegex size={16} />}>
                Regex Test
              </Tabs.Tab>
              <Tabs.Tab value="about-me" leftSection={<IconUser size={16} />}>
                About Me
              </Tabs.Tab>
              <Tabs.Tab value="experiences" leftSection={<IconTimeline size={16} />}>
                Experiences
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

            {/* The content panel for the "Test Vulnerability" tab */}
            <Tabs.Panel value="test-vulnerability" pt="xs">
              <UserInput onSubmit={(content) => console.log('Submitted:', content)} />
            </Tabs.Panel>

            {/* The content panel for the "File Viewer" tab */}
            <Tabs.Panel value="file-viewer" pt="xs">
              <FileViewer onFileLoad={(filename, _content) => console.log('File loaded:', filename)} />
            </Tabs.Panel>

            {/* The content panel for the "Regex Validator" tab */}
            <Tabs.Panel value="regex-validator" pt="xs">
              <RegexValidator onValidate={(input, result) => console.log('Validation:', input, result)} />
            </Tabs.Panel>

            {/* The content panel for the "About Me" tab */}
            <Tabs.Panel value="about-me" pt="xs">
              <AboutMe />
            </Tabs.Panel>

            {/* The content panel for the "Experiences" tab */}
            <Tabs.Panel value="experiences" pt="xs">
              <Experiences />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </MantineProvider>
  );
}