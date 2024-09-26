import React from 'react';
import { Image } from 'react-native';
import { Button, Text, Box } from 'native-base';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
      <Image
        source={require('../assets/logo/logo-white.png')}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text fontSize="3xl" fontWeight="bold" color="#2C2C2C" marginBottom={4}>
        Welcome to Your App
      </Text>
      <Text fontSize="lg" color="#4A4A4A" marginBottom={6}>
        Track your investments effortlessly.
      </Text>
      <Button
        colorScheme="dark"
        width="80%"
        marginBottom={4}
        onPress={() => router.push('/login')}
        _text={{ color: '#FFFFFF' }}
        bg="#4A4A4A"
        _hover={{ bg: '#383838' }}
      >
        Login
      </Button>
      <Button
        variant="outline"
        borderColor="#DDDDDD"
        colorScheme="light"
        width="80%"
        _text={{ color: '#4A4A4A' }}
        _hover={{ bg: '#F9F9F9' }}
        onPress={() => router.push('/register')}
      >
        Register
      </Button>
    </Box>
  );
};

export default HomeScreen;
