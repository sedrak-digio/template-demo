import React, { useState } from 'react';
import {
  TextInput,
  Text,
  Button,
  Stack,
  Divider,
  Paper,
  SimpleGrid,
  Tooltip,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';

interface Question {
  text: string;
  result: string;
}

const MultiQuestionSearchBar: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const theme = useMantineTheme();

  const addQuestion = () => {
    if (currentQuestion.trim() !== '') {
      setQuestions([
        ...questions,
        { text: currentQuestion, result: 'Loading...' },
      ]);
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
  const search = async (question: string) => {
    // Simulate a delay for demonstration
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Heya!")
    debugger;
    const responseJson = await(await fetch(`https://australia-southeast2-mg-mantelorians.cloudfunctions.net/queenstown?q=${question}`)).json();
    console.log(responseJson)

    // Replace with your actual search logic
    return `${responseJson.response}`;
  };

  const processQuestions = async () => {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      try {
        const result = await search(question.text);
        const updatedQuestions = [...questions];
        updatedQuestions[i] = { ...question, result };
        setQuestions(updatedQuestions);
      } catch (error) {
        console.error('Error searching:', error);
        const updatedQuestions = [...questions];
        updatedQuestions[i] = { ...question, result: 'Error' };
        setQuestions(updatedQuestions);
      }
    }
  };

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Text size="lg" weight={700} mb="md">
       Queenstown suggestion search!
      </Text>

      <Stack spacing="xs">
        <Group position="apart">
          <TextInput
            placeholder="Enter your question"
            value={currentQuestion}
            onChange={handleQuestionChange}
            rightSection={<IconPlus size={16} onClick={addQuestion} />}
          />
          <Button variant="outline" onClick={processQuestions}>
            Search
          </Button>
        </Group>

        {questions.length > 0 && (
          <>
            <Divider my="md" />
            <SimpleGrid cols={1} spacing="md">
              {questions.slice().reverse().map((question, index) => (
                <Paper key={index} p="sm" radius="md" withBorder>
                  <Group position="apart">
                    <Text weight={500}>{question.text}</Text>
                    <Tooltip
                      label="Remove question"
                      position="bottom"
                      withArrow
                    >
                      <IconTrash
                        size={16}
                        color={theme.colors.gray[5]}
                        onClick={() => removeQuestion(index)}
                      />
                    </Tooltip>
                  </Group>
                  <Text mt="xs" color={theme.colors.gray[6]}>
                    <ReactMarkdown>{question.result}</ReactMarkdown>
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default MultiQuestionSearchBar;