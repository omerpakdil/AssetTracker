import React, { useEffect, useState } from 'react';
import { Box, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface UserInfo {
  username: string;
  email: string;
}

const UserInfoScreen = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://192.168.1.104:3000/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F9F9F9">
    <Box width="90%" maxW="500px">
      <Text fontSize="4xl" fontWeight="bold" color="#2C2C2C" textAlign="center" mb={6}>
        Kullanıcı Bilgileri
      </Text>
      <Box borderWidth={1} borderColor="#E0E0E0" borderRadius={8} p={4} bg="#FFFFFF" shadow={2}>
        <Text fontSize="lg" color="#4A4A4A" mb={4}>
          <Text fontWeight="bold">Kullanıcı Adı:</Text> {userInfo?.username}
        </Text>
        <Text fontSize="lg" color="#4A4A4A">
          <Text fontWeight="bold">E-posta:</Text> {userInfo?.email}
        </Text>
      </Box>
    </Box>
  </Box>
  );
};

export default UserInfoScreen;
