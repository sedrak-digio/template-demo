import React, { useState } from 'react';
import {
  TextInput,
  Text,
  Button,
  Stack, Paper, Group,
  useMantineTheme,
  Chip,
  Loader,
  Alert,
} from '@mantine/core';
import { IconPlus, IconInfoCircle } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';

const MultiQuestionSearchBar: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null); // State for search results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useMantineTheme();

  // Function to handle Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      addQuestion(); // Add the current question first
      processQuestions(); // Then process all questions
    }
  };

  const addQuestion = async () => {
    if (currentQuestion.trim() !== '') {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
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
    const responseJson = await(await fetch(`https://australia-southeast2-mg-mantelorians.cloudfunctions.net/queenstown?q=${questions.join(',')}`)).json();
    console.log(responseJson)

    // Replace with your actual search logic
    return responseJson.response;
  };

  const processQuestions = async () => {
    if (isLoading) return; // Prevent multiple simultaneous searches
    
    try {
      setIsLoading(true);
      setError(null);
      setSearchResults(null);
      
      const result = await search(questions.length > 0 ? questions : [currentQuestion]);
      setQuestions([]); // Clear the input chips after search
      setCurrentQuestion('');
      setSearchResults(result); // Update search results state
    } catch (error) {
      console.error('Error searching:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while searching');
      setSearchResults(null);
    } finally {
      setIsLoading(false);
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
            w="80%"
            placeholder="Enter your descriptive question, such as 'bars in town, with live music?'"
            value={currentQuestion}
            onChange={handleQuestionChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rightSection={<IconPlus size={16} onClick={addQuestion} />}
          />
          <Button 
            variant="outline" 
            onClick={processQuestions}
            loading={isLoading}
            disabled={isLoading}
          >
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

        {isLoading && (
          <Group mt="md" align="center">
            <Loader size="sm" />
            <Text size="sm" color={theme.colors.gray[6]}>
              Searching for suggestions...
            </Text>
          </Group>
        )}

        {error && (
          <Alert icon={<IconInfoCircle size="1rem" />} color="red" mt="md">
            {error}
          </Alert>
        )}

        {searchResults !== null && !isLoading && (
          <Text mt="md" color={theme.colors.gray[6]}>
            <ReactMarkdown>{searchResults}</ReactMarkdown>
          </Text>
        )}

      </Stack>
    </Paper>
  );
};

export default MultiQuestionSearchBar;