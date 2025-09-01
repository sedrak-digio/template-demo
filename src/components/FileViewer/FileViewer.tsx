import { useState } from 'react';
import { TextInput, Button, Card, Text, Textarea } from '@mantine/core';

interface FileViewerProps {
  onFileLoad?: (filename: string, content: string) => void;
}

// INTENTIONAL SECURITY VULNERABILITY FOR TESTING - PATH TRAVERSAL
// This component demonstrates path traversal vulnerability that should be detected by CodeQL
export default function FileViewer({ onFileLoad }: FileViewerProps) {
  const [filename, setFilename] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);

  const loadFile = async () => {
    setLoading(true);
    try {
      // CRITICAL VULNERABILITY: Path traversal - user input directly used in file path
      // This allows attackers to access files outside the intended directory
      // Example attack: "../../../etc/passwd" or "..\\..\\windows\\system32\\config\\sam"
      const response = await fetch(`/api/files/${filename}`);
      
      if (response.ok) {
        const content = await response.text();
        setFileContent(content);
        
        if (onFileLoad) {
          onFileLoad(filename, content);
        }
      } else {
        setFileContent('Error: File not found or access denied');
      }
    } catch (error) {
      setFileContent(`Error loading file: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // ADDITIONAL VULNERABILITY: Client-side path construction
  const downloadFile = () => {
    // SECURITY ISSUE: Unvalidated file path construction
    const downloadPath = `/downloads/${filename}`;
    window.open(downloadPath, '_blank');
  };

  // ANOTHER VULNERABILITY: Unsafe URL construction
  const shareFile = () => {
    // SECURITY ISSUE: User input directly embedded in URL without validation
    const shareUrl = `${window.location.origin}/share?file=${filename}`;
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        File Viewer (Security Test Component)
      </Text>
      
      <Text size="sm" c="red" mb="sm">
        ⚠️ SECURITY WARNING: This component has intentional path traversal vulnerabilities.
        Try: "../../../etc/passwd" or "config.json" or "../../sensitive.txt"
      </Text>
      
      <TextInput
        placeholder="Enter filename (e.g., config.json, ../secret.txt)"
        value={filename}
        onChange={(e) => setFilename(e.currentTarget.value)}
        mb="md"
        label="Filename"
      />
      
      <Button.Group mb="md">
        <Button onClick={loadFile} loading={loading} disabled={!filename}>
          Load File
        </Button>
        <Button variant="outline" onClick={downloadFile} disabled={!filename}>
          Download
        </Button>
        <Button variant="light" onClick={shareFile} disabled={!filename}>
          Share
        </Button>
      </Button.Group>
      
      {fileContent && (
        <Card withBorder p="sm" bg="gray.1">
          <Text size="sm" c="dimmed" mb="xs">File Content:</Text>
          <Textarea
            value={fileContent}
            readOnly
            autosize
            minRows={4}
            maxRows={10}
          />
        </Card>
      )}
    </Card>
  );
}