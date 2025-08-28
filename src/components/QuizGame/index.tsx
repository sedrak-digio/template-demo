import {
  Stack,
  Title,
  Button,
  // Badge,
  // Group,
  Container,
  Loader,
  Center,
  TextInput,
  Group,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import GuessWho from './GuessWho';
import MantelorianCards from './MantelorianCards';
import { Mntl } from './types';

export default function QuizGame() {
  const [gameState, setGameState] = useState<'started' | 'ended'>('started');
  const [mntl, setMntl] = useState<Mntl[]>([]);
  const [correctPeeps, setCorrectPeeps] = useState<Mntl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadGameData = async () => {
      setIsLoading(true);

      // This is the key change: check if we are in development mode
      if (process.env.NODE_ENV === 'development') {
        // console.log("DEV MODE: Loading local fixture data.");
        // // // Dynamically import fixtures to keep them out of the production bundle
        // const { getMockMntlData } = await import('../../fixtures/hpSlackFixtures'); 
        // const mockData = getMockMntlData();
        // console.log("Mock data loaded:", mockData);
        // setMntl(mockData);
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
          const mappedMNTL: Mntl[] = data.collectionList[0].members
          
        //   .map((h: any) => ({
        //     email: h.profile.email,
        //     id: h.profile.email,
        //     sId: h.id,
        //     name: h.profile.real_name,
        //     image: h.profile.image_original,
        //     image_192: `https://ca.slack-edge.com/${h.team_id}-${h.id}-${h.profile.avatar_hash}-128`,
        //   }));

          setMntl(mappedMNTL);
        } catch (error) {
          console.error("Failed to fetch production data:", error);
        }
      }

      setIsLoading(false);
    };

    // Only load data if the mntl array is empty
    if (mntl.length < 1) {
      loadGameData();
    }
  }, [mntl.length]); // Dependency array is correct

  const gameReset = () => {
    setCorrectPeeps([]);
    setGameState('started');
    setSearchQuery('');
  };

  // Filter correct peeps based on search query
  const filteredCorrectPeeps = correctPeeps.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              
              <Group justify="space-between" align="flex-end" mt="xl">
                <Title order={3}>Mantelorians You've Guessed:</Title>
                <TextInput
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  leftSection={<IconSearch size={16} />}
                  w={250}
                />
              </Group>
              
              <MantelorianCards members={filteredCorrectPeeps} />
            </Stack>
          )}
          {gameState === 'started' && mntl.length > 0 && (
            <GuessWho
              data={mntl}
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