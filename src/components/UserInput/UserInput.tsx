import { useState } from 'react';
import { TextInput, Button, Card, Text } from '@mantine/core';

interface UserInputProps {
  onSubmit?: (content: string) => void;
}

// INTENTIONAL SECURITY VULNERABILITY FOR TESTING
// This component demonstrates an XSS vulnerability that should be detected by CodeQL
export default function UserInput({ onSubmit }: UserInputProps) {
  const [userContent, setUserContent] = useState('');
  const [displayContent, setDisplayContent] = useState('');

  const handleSubmit = () => {
    // VULNERABILITY: Direct use of user input in dangerouslySetInnerHTML without sanitization
    // This could allow XSS attacks if user input contains malicious scripts
    setDisplayContent(userContent);
    
    // ADDITIONAL VULNERABILITY: Using eval() with user input - EXTREMELY DANGEROUS
    // This is one of the most dangerous patterns and should be easily detected by CodeQL
    try {
      if (userContent.startsWith('calculate:')) {
        const expression = userContent.replace('calculate:', '').trim();
        // CRITICAL SECURITY ISSUE: eval() with user input allows arbitrary code execution
        const result = eval(expression);
        console.log('Calculation result:', result);
      }
    } catch (error) {
      console.error('Calculation error:', error);
    }
    
    if (onSubmit) {
      onSubmit(userContent);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        User Content Input (Test Component)
      </Text>
      
      <Text size="sm" c="dimmed" mb="sm">
        ⚠️ This component has intentional security vulnerabilities for testing.
        Try: "calculate: 2+2" or HTML like "&lt;b&gt;bold&lt;/b&gt;"
      </Text>
      
      <TextInput
        placeholder="Enter some content or calculate: 2+2..."
        value={userContent}
        onChange={(e) => setUserContent(e.currentTarget.value)}
        mb="md"
      />
      
      <Button onClick={handleSubmit} mb="md">
        Submit Content
      </Button>
      
      {displayContent && (
        <Card withBorder p="sm" bg="gray.1">
          <Text size="sm" c="dimmed" mb="xs">User Content Display:</Text>
          {/* SECURITY VULNERABILITY: Unsafe use of dangerouslySetInnerHTML */}
          {/* This allows arbitrary HTML/JS execution from user input */}
          <div 
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />
        </Card>
      )}
    </Card>
  );
}