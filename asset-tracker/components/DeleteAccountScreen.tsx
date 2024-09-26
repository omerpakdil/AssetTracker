import React, { useState } from 'react';
import { Box, Text, Button, AlertDialog } from 'native-base';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccountScreen = () => {
  const [isOpen, setIsOpen] = useState(true);
  const cancelRef = React.useRef(null);
  const router = useRouter();
  const onClose = () => {
    setIsOpen(false);
    router.push('/profile/settings')
  };

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete('http://192.168.1.104:3000/user/delete', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Hesabımı Sil</AlertDialog.Header>
          <AlertDialog.Body>
            Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={onClose} variant="outline" borderColor="#DDDDDD" _text={{ color: '#4A4A4A' }}>
              Vazgeç
            </Button>
            <Button onPress={handleDeleteAccount} ml={3} bg="#E53E3E" _hover={{ bg: '#C53030' }} _text={{ color: '#FFFFFF' }}>
              Hesabı Sil
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default DeleteAccountScreen;
