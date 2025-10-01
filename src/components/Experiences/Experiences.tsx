import { Container, Title, Tabs, Timeline, Card, Text, Badge, Group, Button, Anchor, List } from '@mantine/core';
import { IconCode, IconPlane, IconExternalLink, IconBrandGithub, IconCalendar, IconMapPin } from '@tabler/icons-react';
import { developmentExperiences, travelExperiences } from '../../data/experiences';
import { DevelopmentExperience, TravelExperience } from '../../types/experiences';

function DevelopmentTimelineItem({ experience }: { experience: DevelopmentExperience }) {
  const formatDate = (date: string, endDate?: string) => {
    const start = new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (endDate) {
      const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return `${start} - ${end}`;
    }
    return start;
  };

  return (
    <Timeline.Item
      bullet={<IconCode size={16} />}
      title={
        <Group gap="sm">
          <Text fw={600}>{experience.title}</Text>
          {experience.featured && <Badge color="blue" size="sm">Featured</Badge>}
        </Group>
      }
    >
      <Card withBorder padding="md" mt="sm">
        <Group gap="xs" mb="sm">
          <IconCalendar size={14} />
          <Text size="sm" c="dimmed">{formatDate(experience.date, experience.dateEnd)}</Text>
          <Text size="sm" c="dimmed">•</Text>
          <Text size="sm" c="dimmed">{experience.role}</Text>
        </Group>

        <Text size="sm" mb="md">{experience.description}</Text>

        <Group gap="xs" mb="md">
          {experience.tags.map((tech) => (
            <Badge key={tech} variant="light" size="sm">{tech}</Badge>
          ))}
        </Group>

        {experience.impact && (
          <Text size="sm" c="teal" mb="md">
            📈 Impact: {experience.impact}
          </Text>
        )}

        <Group gap="sm">
          {experience.projectUrl && (
            <Button 
              component={Anchor} 
              href={experience.projectUrl} 
              target="_blank"
              size="xs" 
              variant="light"
              leftSection={<IconExternalLink size={14} />}
            >
              View Project
            </Button>
          )}
          {experience.githubUrl && (
            <Button 
              component={Anchor} 
              href={experience.githubUrl} 
              target="_blank"
              size="xs" 
              variant="outline"
              leftSection={<IconBrandGithub size={14} />}
            >
              GitHub
            </Button>
          )}
        </Group>
      </Card>
    </Timeline.Item>
  );
}

function TravelTimelineItem({ experience }: { experience: TravelExperience }) {
  const formatDate = (date: string, endDate?: string) => {
    const start = new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (endDate) {
      const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return `${start} - ${end}`;
    }
    return start;
  };

  return (
    <Timeline.Item
      bullet={<IconPlane size={16} />}
      title={
        <Group gap="sm">
          <Text fw={600}>{experience.title}</Text>
          {experience.featured && <Badge color="teal" size="sm">Featured</Badge>}
        </Group>
      }
    >
      <Card withBorder padding="md" mt="sm">
        <Group gap="xs" mb="sm">
          <IconCalendar size={14} />
          <Text size="sm" c="dimmed">{formatDate(experience.date, experience.dateEnd)}</Text>
          <Text size="sm" c="dimmed">•</Text>
          <IconMapPin size={14} />
          <Text size="sm" c="dimmed">{experience.location}, {experience.country}</Text>
        </Group>

        <Text size="sm" mb="md">{experience.description}</Text>

        <Group gap="xs" mb="md">
          <Badge variant="light" color="teal" size="sm">{experience.duration}</Badge>
          {experience.tags.map((tag) => (
            <Badge key={tag} variant="light" size="sm">{tag}</Badge>
          ))}
        </Group>

        {experience.highlights && experience.highlights.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <Text size="sm" fw={500} mb="xs">Highlights:</Text>
            <List size="sm" spacing="xs">
              {experience.highlights.map((highlight, index) => (
                <List.Item key={index}>{highlight}</List.Item>
              ))}
            </List>
          </div>
        )}

        {experience.recommendations && (
          <Text size="sm" c="blue" style={{ fontStyle: 'italic' }}>
            💡 "{experience.recommendations}"
          </Text>
        )}
      </Card>
    </Timeline.Item>
  );
}

export default function Experiences() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        My Experiences
      </Title>

      <Tabs defaultValue="development" variant="outline" radius="md">
        <Tabs.List grow>
          <Tabs.Tab value="development" leftSection={<IconCode size={16} />}>
            Development Projects
          </Tabs.Tab>
          <Tabs.Tab value="travel" leftSection={<IconPlane size={16} />}>
            Travel Experiences
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="development" pt="xl">
          <Timeline active={-1} bulletSize={24} lineWidth={2}>
            {developmentExperiences.map((experience) => (
              <DevelopmentTimelineItem key={experience.id} experience={experience} />
            ))}
          </Timeline>
        </Tabs.Panel>

        <Tabs.Panel value="travel" pt="xl">
          <Timeline active={-1} bulletSize={24} lineWidth={2}>
            {travelExperiences.map((experience) => (
              <TravelTimelineItem key={experience.id} experience={experience} />
            ))}
          </Timeline>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}