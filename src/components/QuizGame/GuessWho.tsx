import React, { useEffect, useState } from 'react';
import {
  Text,
  Avatar,
  SimpleGrid,
  Paper,
  Group,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import classes from './GuessWho.module.css'; // 1. Import the CSS module

// Mantine v7: Notifications are now imported like this
// import { notifications } from '@mantine/notifications';

// Define a type for the person object
interface Hpp {
  email: string;
  id: string;
  sId: string;
  name: string;
  image: string;
  image_192: string;
}

// Define props for the component
interface GuessWhoProps {
  data: Hpp[];
  setGameState: React.Dispatch<React.SetStateAction<'started' | 'ended'>>;
  correctPeeps: Hpp[];
  setCorrectPeeps: React.Dispatch<React.SetStateAction<Hpp[]>>;
}

export default function GuessWho({
  data,
  setGameState,
  correctPeeps,
  setCorrectPeeps,
}: GuessWhoProps) {
  const theme = useMantineTheme();
  // State with TypeScript types
  const [peeps, setPeeps] = useState<Hpp[]>([]);
  const [peep, setPeep] = useState<Hpp | undefined>();
  const [remainingPeeps, setRemainingPeeps] = useState<Hpp[]>(data);
  const [timeRemaining, setTimeRemaining] = useState(20);

  // Time countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      setGameState('ended');
      return;
    }
    const intervalId = setInterval(() => {
      setTimeRemaining((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining, setGameState]);

  // Logic to select new peeps for the round
  useEffect(() => {
    if (remainingPeeps.length < 4) {
      setGameState('ended');
      return;
    }

    // Shuffle and pick 4 unique peeps
    const shuffled = [...remainingPeeps].sort(() => 0.5 - Math.random());
    const peepSlice = shuffled.slice(0, 4);
    setPeeps(peepSlice);

    // Select one of them as the correct answer
    const randomPeepIndex = Math.floor(Math.random() * peepSlice.length);
    setPeep(peepSlice[randomPeepIndex]);
  }, [remainingPeeps, setGameState]);

  const handleSelection = (selectedPeep: Hpp) => {
    if (peep?.email === selectedPeep.email) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  };

  const wrongAnswer = () => {
    setTimeRemaining((t) => (t - 5 >= 0 ? t - 5 : 0));
    // Updated Mantine v7 notification API
    // notifications.show({
    //   message: '🥵! -5 sec',
    //   color: 'red',
    //   autoClose: 2000,
    //   style: { width: 180 },
    // });
  };

  const correctAnswer = () => {
    if (!peep) return;
    setCorrectPeeps([...correctPeeps, peep]);
    setRemainingPeeps(remainingPeeps.filter((p) => p.email !== peep.email));
    setPeep(undefined); // Reset correctly
    setTimeRemaining((t) => t + 10);
    // notifications.show({
    //   message: '🥳! +10 sec',
    //   color: 'green',
    //   autoClose: 2000,
    //   style: { width: 180 },
    // });
  };

  const peepUI = peeps.map((currentPeep) => (
    <Paper
      h={160}
      withBorder
      radius="md"
      p="xs"
      onClick={() => handleSelection(currentPeep)}
      key={currentPeep.email}
      // 2. Apply the className from the imported module
      className={classes.peepPaper}
      style={{ display: 'flex', cursor: 'pointer' }}
      // 3. REMOVE the sx prop
    >
      <Group justify="center" style={{ flex: 1, alignItems: 'center' }}>
        <Text ta="center" fw={500}>{currentPeep.name}</Text>
      </Group>
    </Paper>
  ));

  return (
    <Stack my="md">
      <Title order={1}>
        Guess <Text span fw={300} inherit>Who?</Text>
      </Title>
      <Text>
        Quick! You only have{' '}
        <Text span c="red.8" fw={700}>{timeRemaining} seconds</Text> to guess the name!
      </Text>
      <Group justify="space-between">
        <Title order={3}>
          <span role="img" aria-label="thumbs up">👍</span>
          {' '}{correctPeeps.length} / {data.length}
        </Title>
      </Group>
      <div style={{ width: '100%', height: 400, position: 'relative' }}>
        {/* Updated SimpleGrid with responsive `cols` prop */}
        <SimpleGrid spacing="xl" cols={{ base: 2 }}>
          {peepUI}
        </SimpleGrid>

        <Avatar
          size={128} // Use size prop directly
          radius="50%" // Make it a circle
          src={peep?.image_192}
          alt="Guess who?"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: `4px solid ${theme.white}`,
            boxShadow: theme.shadows.md,
          }}
        />
      </div>
    </Stack>
  );
}