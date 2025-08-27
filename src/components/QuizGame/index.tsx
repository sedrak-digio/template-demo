import {
  Stack,
  Title,
  Button,
  // Badge,
  // Group,
  Container,
  Loader,
  Center,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import GuessWho from './GuessWho';
import MantelorianCards from './MantelorianCards';

// Define a type for the person object for type safety
interface Hpp {
  email: string;
  id: string;
  sId: string;
  name: string;
  image: string;
  image_192: string;
}

export default function QuizGame() {
  const [gameState, setGameState] = useState<'started' | 'ended'>('started');
  const [hpp, setHpp] = useState<Hpp[]>([]);
  const [correctPeeps, setCorrectPeeps] = useState<Hpp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadGameData = async () => {
      setIsLoading(true);

      // This is the key change: check if we are in development mode
      if (process.env.NODE_ENV === 'development') {
        // console.log("DEV MODE: Loading local fixture data.");
        // // // Dynamically import fixtures to keep them out of the production bundle
        // const { getMockHppData } = await import('../../fixtures/hpSlackFixtures'); 
        // const mockData = getMockHppData();
        // console.log("Mock data loaded:", mockData);
        // setHpp(mockData);
      } else {
        // This is the production code that calls the real API
        console.log("PROD MODE: Fetching data from API.");
        try {
          // Get the apiKey from the URL query parameter
          const urlParams = new URLSearchParams(window.location.search);
          const apiKey = urlParams.get('xid') || '';

          const response = await fetch(`/api/members`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add the secret API key to the header here
                'x-api-key': apiKey,
            },
          });
          if (!response.ok) throw new Error("API Fetch failed");
          const data = await response.json();
          // Assuming the API has the old structure, adjust if needed
          const mappedHPP: Hpp[] = data.collectionList[0].members
          
        //   .map((h: any) => ({
        //     email: h.profile.email,
        //     id: h.profile.email,
        //     sId: h.id,
        //     name: h.profile.real_name,
        //     image: h.profile.image_original,
        //     image_192: `https://ca.slack-edge.com/${h.team_id}-${h.id}-${h.profile.avatar_hash}-128`,
        //   }));

          setHpp(mappedHPP);
        } catch (error) {
          console.error("Failed to fetch production data:", error);
        }
      }

      setIsLoading(false);
    };

    // Only load data if the hpp array is empty
    if (hpp.length < 1) {
      loadGameData();
    }
  }, [hpp.length]); // Dependency array is correct

  const gameReset = () => {
    setCorrectPeeps([]);
    setGameState('started');
  };

  return (
    <Container>
      {isLoading ? (
        <Center style={{ height: '100vh' }}>
          <Loader />
        </Center>
      ) : (
        <Stack>
          {gameState === 'ended' && (
            <Stack align="flex-start" mt="xl" w="100%">
              <Title order={2}>Total score: {correctPeeps.length}</Title>
              <Button
                onClick={gameReset}
                variant="filled"
                color="pink"
                rightSection={
                  <span role="img" aria-label="glowing star emoji">
                    🤩
                  </span>
                }
              >
                Play again
              </Button>
              <Title order={3} mt="xl">Mantelorians You've Guessed:</Title>
              <MantelorianCards members={correctPeeps} />
            </Stack>
          )}
          {gameState === 'started' && hpp.length > 0 && (
            <GuessWho
              data={hpp}
              setGameState={setGameState}
              correctPeeps={correctPeeps}
              setCorrectPeeps={setCorrectPeeps}
            />
          )}
        </Stack>
      )}
    </Container>
  );
}