import React, { useState } from 'react';
import { Box, Input, Button, Text } from 'native-base';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red.500');
  const router = useRouter();

  const handleChangePassword = async () => {
    if (!currentPassword) {
      setMessage('Mevcut şifre gereklidir.');
      setMessageColor('red.500');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage('Yeni şifreler eşleşmiyor.');
      setMessageColor('red.500');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put('http://192.168.1.104:3000/user/change-password', {
        currentPassword,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Şifre başarıyla güncellendi.');
      setMessageColor('green.500');
    } catch (error) {
      setMessage('Şifre güncellenirken bir hata oluştu.');
      setMessageColor('red.500');
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
      <Text fontSize="3xl" fontWeight="bold" color="#2C2C2C" marginBottom={6}>
        Şifre Değiştir
      </Text>
      <Input
        placeholder="Mevcut Şifre"
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
        marginBottom={4}
        secureTextEntry
      />
      <Input
        placeholder="Yeni Şifre"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        marginBottom={4}
        secureTextEntry
      />
      <Input
        placeholder="Yeni Şifreyi Onayla"
        value={confirmNewPassword}
        onChangeText={(text) => setConfirmNewPassword(text)}
        marginBottom={4}
        secureTextEntry
      />
      <Button
        colorScheme="dark"
        onPress={handleChangePassword}
        _text={{ color: '#FFFFFF' }}
        bg="#4A4A4A"
        _hover={{ bg: '#383838' }}
      >
        Şifre Değiştir
      </Button>
      {message && <Text marginTop={4} color={messageColor}>{message}</Text>}
    </Box>
  );
};

export default ChangePasswordScreen;
