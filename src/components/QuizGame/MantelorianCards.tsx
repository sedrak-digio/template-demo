import {
  Card,
  Avatar,
  Text,
  SimpleGrid,
  Stack,
  Badge,
  ActionIcon,
  Group,
} from '@mantine/core';
import { IconBrandSlack } from '@tabler/icons-react';

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

// Function to generate Slack profile URL
const getSlackProfileUrl = (sId: string): string => {
  return `https://slack.com/app_redirect?channel=${sId}`;
};

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
            <Group gap="xs">
              <Badge color="cyan" size="md" variant="light">
                Mantelorian
              </Badge>
              <ActionIcon
                variant="light"
                color="violet"
                size="md"
                component="a"
                href={getSlackProfileUrl(member.sId)}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${member.name}'s Slack profile`}
              >
                <IconBrandSlack size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}