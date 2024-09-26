import React from 'react';
import { Box, Button } from 'native-base';
import { useColorScheme } from 'react-native';

interface ChangeThemeScreenProps {
    setTheme: (theme: 'light' | 'dark') => void;
  }

const ChangeThemeScreen: React.FC<ChangeThemeScreenProps> = ({ setTheme }) => {
  const colorScheme = useColorScheme();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
      <Button onPress={() => setTheme('light')}>Light Theme</Button>
      <Button onPress={() => setTheme('dark')}>Dark Theme</Button>
    </Box>
  );
};

export default ChangeThemeScreen;
