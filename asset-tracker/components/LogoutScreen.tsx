import React, { useState, useRef } from 'react';
import { Box, Text, Button, AlertDialog } from 'native-base';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const [isOpen, setIsOpen] = useState(true);
  const cancelRef = useRef(null);
  const router = useRouter();
  const onClose = () => {
    setIsOpen(false);
    router.push('/profile')
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Çıkış Yap</AlertDialog.Header>
          <AlertDialog.Body>
            Çıkış yapmak istediğinizden emin misiniz?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onClose} variant="outline" borderColor="#DDDDDD" _text={{ color: '#4A4A4A' }}>
              Vazgeç
            </Button>
            <Button onPress={handleLogout} ml={3} bg="#E53E3E" _hover={{ bg: '#C53030' }} _text={{ color: '#FFFFFF' }}>
              Çıkış Yap
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default LogoutScreen;
