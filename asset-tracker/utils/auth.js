import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isTokenValid = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};
