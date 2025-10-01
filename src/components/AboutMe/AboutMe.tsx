import { Container, Grid, Card, Text, Title, Divider } from '@mantine/core';
import { IconCode, IconPlane, IconBrain, IconMap } from '@tabler/icons-react';

export default function AboutMe() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        About Me
      </Title>
      
      <Grid gutter="xl">
        {/* Part 1: 0 to 1 Product Developer */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <IconCode size={32} style={{ marginRight: '0.5rem' }} />
              <Title order={2} size="h3">
                0 to 1 Product Developer
              </Title>
            </div>
            
            <Text size="md" mb="md" c="dimmed">
              I specialize in taking products from concept to launch, leveraging cutting-edge AI tools 
              and methodologies to accelerate development and enhance capabilities.
            </Text>
            
            <Divider my="md" />
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <IconBrain size={20} style={{ marginRight: '0.5rem' }} />
                <Text fw={600}>AI-Powered Development</Text>
              </div>
              <Text size="sm" c="dimmed" pl="xl">
                Utilizing AI for development tooling and coaching to streamline the build process
              </Text>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <IconCode size={20} style={{ marginRight: '0.5rem' }} />
                <Text fw={600}>AI Integration</Text>
              </div>
              <Text size="sm" c="dimmed" pl="xl">
                Embedding AI capabilities directly into products as part of the core development strategy
              </Text>
            </div>
            
            <Text size="sm" mt="md" c="blue">
              From ideation to deployment - I help bring your vision to life with modern AI-enhanced workflows.
            </Text>
          </Card>
        </Grid.Col>

        {/* Part 2: Digital Nomad Travels */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <IconPlane size={32} style={{ marginRight: '0.5rem' }} />
              <Title order={2} size="h3">
                Digital Nomad Travels
              </Title>
            </div>
            
            <Text size="md" mb="md" c="dimmed">
              With over 8 years of experience as a digital nomad, I've mastered the art of 
              working remotely while exploring the world.
            </Text>
            
            <Divider my="md" />
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <IconMap size={20} style={{ marginRight: '0.5rem' }} />
                <Text fw={600}>Travel Coaching</Text>
              </div>
              <Text size="sm" c="dimmed" pl="xl">
                Personalized advice and guidance for aspiring digital nomads and remote workers
              </Text>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <IconPlane size={20} style={{ marginRight: '0.5rem' }} />
                <Text fw={600}>Itinerary Planning</Text>
              </div>
              <Text size="sm" c="dimmed" pl="xl">
                Custom travel itineraries based on work requirements, budget, and personal preferences
              </Text>
            </div>
            
            <Text size="sm" mt="md" c="teal">
              Let me help you navigate the nomadic lifestyle with insights from 8+ years on the road.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}