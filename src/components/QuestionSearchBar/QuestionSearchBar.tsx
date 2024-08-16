import React, { useState } from 'react';
import {
  TextInput,
  Text,
  Button,
  Stack, Paper, Group,
  useMantineTheme,
  Chip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react'; // Keep this for now
import ReactMarkdown from 'react-markdown';

const MultiQuestionSearchBar: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null); // State for search results
  const theme = useMantineTheme();

  const addQuestion = () => {
    if (currentQuestion.trim() !== '') {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    debugger;
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion(event.target.value);
  };

  // Replace this with your actual search logic
  const search = async (questions: string[]) => {
    // Simulate a delay for demonstration
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Heya!")
    debugger;
    const responseJson = await(await fetch(`https://australia-southeast2-mg-mantelorians.cloudfunctions.net/queenstown?q=${questions.join(',')}`)).json();
    console.log(responseJson)

    // Replace with your actual search logic
    return responseJson.response;
  };

  const processQuestions = async () => {
    try {
      setSearchResults("Loading... (don't judge me too harshly, I'll get around the the UI in a hot minute!"); // Update search results state
      const result = await search(questions);
      setQuestions([]); // Clear the input chips after search
      setCurrentQuestion('');
      setSearchResults(result); // Update search results state
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults('Error'); // Update search results state for error
    }
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Text size="lg" mb="md">
        Queenstown suggestion search!
      </Text>

      <Stack>
        <Group>
          <TextInput
            width='800'
            placeholder="Enter your descriptive question"
            value={currentQuestion}
            onChange={handleQuestionChange}
            rightSection={<IconPlus size={16} onClick={addQuestion} />}
          />
          <Button variant="outline" onClick={processQuestions}>
            Search
          </Button>
        </Group>

        {questions.length > 0 && (
          <Group mt="sm">
            {questions.map((question, index) => (
              <Chip
                key={index}
                variant="outline"
                color="gray"
                onClick={() => removeQuestion(index)}
                // rightSection={
                //   <IconTrash
                //     size={14}
                //     onClick={() => removeQuestion(index)}
                //   />
                // }
              >
                {question}
              </Chip>
            ))}
          </Group>
        )}

        {searchResults !== null && (
          <Text mt="md" color={theme.colors.gray[6]}>
            <ReactMarkdown>{searchResults}</ReactMarkdown>
          </Text>
        )}

      </Stack>
    </Paper>
  );
};

export default MultiQuestionSearchBar;