import React, { useEffect, useState } from 'react';
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
  const [summary, setSummary] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null); // State for search results
  const theme = useMantineTheme();

  let isLoad = true;

  useEffect(() => {
    loadBook();
  }, [])


  // Function to handle Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
    const responseJson = await (await fetch(`https://australia-southeast1-bookai-435011.cloudfunctions.net/function-1?q==${questions.join(',')}`)).json();
    console.log(responseJson)

    // Replace with your actual search logic
    return responseJson;
  };

  const processQuestions = async () => {
    try {
      setSearchResults("Loading... (don't judge me too harshly, I'll get around the UI in a hot minute!)"); // Update search results state
      const result = await search(questions.length > 0 ? questions : [currentQuestion]);
      setQuestions([]); // Clear the input chips after search
      setCurrentQuestion('');
      setSearchResults(result); // Update search results state
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults('Error'); // Update search results state for error
    }
  };

  const loadBook = async () => {
    try {
      if(!isLoad) return;
      isLoad=false;
      setSearchResults("Warming up... (Don't judge me too harshly; I'll get around the UI in a hot minute!) I'm currently analysing the book and will respond with a summary, after which you can ask away with any question. After the initial analysis, questions can take up to a minute or two depending on the complexity, though have fun and really test the limits!)"); // Update search results state
      const result = await search(questions.length > 0 ? questions : [currentQuestion]);
      setQuestions([]); // Clear the input chips after search
      setCurrentQuestion('');
      setSummary(result); // Update search results state
      setSearchResults('Loaded the book! Lets get this party started now, ask away!');
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults('Error'); // Update search results state for error
    }
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Text size="lg" mb="md">
        Pride and Prejudice book Analysis!
      </Text>

      <Stack>
        <Group>
          <TextInput
            w="80%"
            placeholder="Enter your descriptive question, such as 'Which characters interact with each other??'"
            value={currentQuestion}
            onChange={handleQuestionChange}
            onKeyDown={handleKeyDown}
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
        {summary !== null && (
          <Text mt="md" color={theme.colors.gray[6]}>
            Summary:
            <ReactMarkdown>{summary}</ReactMarkdown>
          </Text>
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