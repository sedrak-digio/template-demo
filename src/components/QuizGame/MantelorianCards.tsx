import {
  Card,
  Avatar,
  Text,
  SimpleGrid,
  Stack,
  Badge,
} from '@mantine/core';

interface Hpp {
  email: string;
  id: string;
  sId: string;
  name: string;
  image: string;
  image_192: string;
}

interface MantelorianCardsProps {
  members: Hpp[];
}

export default function MantelorianCards({ members }: MantelorianCardsProps) {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3 }}
      spacing="lg"
      mt="xl"
    >
      {members.map((member) => (
        <Card 
          key={member.email} 
          shadow="sm" 
          padding="xl" 
          radius="md" 
          withBorder
          h="100%"
        >
          <Stack align="center" gap="md" h="100%" justify="center">
            <Avatar
              src={member.image_192 || member.image}
              size={220}
              radius="xl"
            />
            <Text size="md" fw={500} ta="center">
              {member.name}
            </Text>
            <Badge color="cyan" size="md" variant="light">
              Mantelorian
            </Badge>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}