import React from 'react';
import { Box, Text, Button, VStack } from 'native-base';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" padding={4} bg="#F9F9F9">
      <Box width="90%" maxW="500px" mt={16}>
        <Text fontSize="6xl" fontWeight="bold" color="#2C2C2C" textAlign="center" mb={8}>
          Ayarlar
        </Text>
        <VStack space={2} mt={20}>
          <Button
            onPress={() => router.push('/profile/settings/change-email')}
            bg="#333333"
            _text={{ color: '#FFFFFF', fontWeight: 'bold' }}
            _pressed={{ bg: '#444444' }}
            borderRadius={12}
            _hover={{ bg: '#444444' }}
            py={4}
            mb={2}
            shadow={2}
          >
            E-posta Değiştir
          </Button>
          <Button
            onPress={() => router.push('/profile/settings/change-password')}
            bg="#333333"
            _text={{ color: '#FFFFFF', fontWeight: 'bold' }}
            _pressed={{ bg: '#444444' }}
            borderRadius={12}
            _hover={{ bg: '#444444' }}
            py={4}
            mb={2}
            shadow={2}
          >
            Şifre Değiştir
          </Button>
          <Button
            onPress={() => router.push('/profile/settings/delete-account')}
            bg="#C53030"
            _text={{ color: '#FFFFFF', fontWeight: 'bold' }}
            _pressed={{ bg: '#B03A2E' }}
            borderRadius={12}
            _hover={{ bg: '#B03A2E' }}
            py={4}
            shadow={2}
          >
            Hesabı Sil
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SettingsScreen;
