import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Text } from 'native-base';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red.500');
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.1.104:3000/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user email:', error);
        alert('Could not fetch current email.');
      }
    };

    fetchUserEmail();
  }, []);

  const handleChangeEmail = async () => {
    if (!email) {
      setMessage('E-posta adresi gereklidir.');
      setMessageColor('red.500');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Geçerli bir e-posta adresi girin.');
      setMessageColor('red.500');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put('http://192.168.1.104:3000/user/update-email', { email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Email başarıyla güncellendi.');
      setMessageColor('green.500');
    } catch (error) {
      setMessage('E-posta güncellenirken bir hata oluştu.');
      setMessageColor('red.500');
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
      <Text fontSize="3xl" fontWeight="bold" color="#2C2C2C" marginBottom={6}>
        E-posta Değiştir
      </Text>
      <Input
        placeholder="Yeni E-posta"
        value={email}
        onChangeText={(text) => setEmail(text)}
        marginBottom={4}
      />
      <Button
        colorScheme="dark"
        onPress={handleChangeEmail}
        _text={{ color: '#FFFFFF' }}
        bg="#4A4A4A"
        _hover={{ bg: '#383838' }}
      >
        E-posta Değiştir
      </Button>
      {message && <Text marginTop={4} color={messageColor}>{message}</Text>}
    </Box>
  );
};

export default ChangeEmailScreen;
