import { useState } from 'react';
import { TextInput, Button, Card, Text, Alert } from '@mantine/core';

interface RegexValidatorProps {
  onValidate?: (input: string, result: boolean) => void;
}

// INTENTIONAL SECURITY VULNERABILITY FOR TESTING - ReDoS (Regular Expression Denial of Service)
// This component demonstrates ReDoS vulnerability that should be detected by CodeQL
export default function RegexValidator({ onValidate }: RegexValidatorProps) {
  const [userInput, setUserInput] = useState('');
  const [validationResult, setValidationResult] = useState<string>('');
  const [isValidating, setIsValidating] = useState(false);

  const validateInput = () => {
    setIsValidating(true);
    setValidationResult('');
    
    try {
      // CRITICAL VULNERABILITY: Catastrophic backtracking regex (ReDoS)
      // This regex can cause exponential time complexity with certain inputs
      // Attack example: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
      const vulnerableRegex = /^(a+)+b$/;
      
      // SECURITY ISSUE: User input tested against vulnerable regex
      const startTime = Date.now();
      const isValid = vulnerableRegex.test(userInput);
      const endTime = Date.now();
      
      setValidationResult(`Validation ${isValid ? 'passed' : 'failed'} in ${endTime - startTime}ms`);
      
      if (onValidate) {
        onValidate(userInput, isValid);
      }
    } catch (error) {
      setValidationResult(`Validation error: ${error}`);
    } finally {
      setIsValidating(false);
    }
  };

  // ADDITIONAL VULNERABILITY: Another ReDoS pattern
  const validateEmail = () => {
    setIsValidating(true);
    try {
      // ANOTHER VULNERABLE REGEX: Email validation with catastrophic backtracking
      // This can be exploited with inputs like: a@a.a...repeated many times
      const emailRegex = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      
      // SECURITY ISSUE: Direct regex test on user input
      const startTime = Date.now();
      const isValidEmail = emailRegex.test(userInput);
      const endTime = Date.now();
      
      setValidationResult(`Email validation ${isValidEmail ? 'passed' : 'failed'} in ${endTime - startTime}ms`);
    } catch (error) {
      setValidationResult(`Email validation error: ${error}`);
    } finally {
      setIsValidating(false);
    }
  };

  // THIRD VULNERABILITY: Unsafe dynamic regex
  const validatePattern = () => {
    setIsValidating(true);
    try {
      // CRITICAL SECURITY ISSUE: User input used to construct regex pattern
      // This allows regex injection attacks
      const dynamicPattern = new RegExp(userInput);
      const testString = "test123";
      
      const startTime = Date.now();
      const matches = dynamicPattern.test(testString);
      const endTime = Date.now();
      
      setValidationResult(`Pattern test ${matches ? 'matched' : 'no match'} in ${endTime - startTime}ms`);
    } catch (error) {
      setValidationResult(`Pattern validation error: ${error}`);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        Regex Validator (Security Test Component)
      </Text>
      
      <Alert color="orange" mb="md">
        <Text size="sm">
          ⚠️ SECURITY WARNING: This component has ReDoS vulnerabilities.
          <br />
          Try: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab" (ReDoS attack)
          <br />
          Or: "(a+)+" (Regex injection)
        </Text>
      </Alert>
      
      <TextInput
        placeholder="Enter text to validate or regex pattern"
        value={userInput}
        onChange={(e) => setUserInput(e.currentTarget.value)}
        mb="md"
        label="User Input"
      />
      
      <Button.Group mb="md">
        <Button onClick={validateInput} loading={isValidating} disabled={!userInput}>
          Validate (ReDoS)
        </Button>
        <Button variant="outline" onClick={validateEmail} loading={isValidating} disabled={!userInput}>
          Email Check
        </Button>
        <Button variant="light" onClick={validatePattern} loading={isValidating} disabled={!userInput}>
          Pattern Test
        </Button>
      </Button.Group>
      
      {validationResult && (
        <Card withBorder p="sm" bg="gray.1">
          <Text size="sm" c="dimmed" mb="xs">Validation Result:</Text>
          <Text size="sm" fw={500}>
            {validationResult}
          </Text>
        </Card>
      )}
    </Card>
  );
}