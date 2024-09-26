import React,{useEffect} from 'react';
import { Stack } from "expo-router";
import { NativeBaseProvider } from 'native-base';
import { isTokenValid } from '../utils/auth';
import { useRouter } from 'expo-router';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


const RootLayout = () => {

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const valid = await isTokenValid();
      if (valid) {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    };

    checkToken();
  }, []);

  return (
    <NativeBaseProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
        <Stack.Screen name="register" options={{ headerTitle: "Register" }} />
        <Stack.Screen name="dashboard" options={{ headerTitle: "Dashboard" }} />
        <Stack.Screen name="forgot-password" options={{ headerTitle: "Forgot Password" }} />
        <Stack.Screen name="reset-password" options={{ headerTitle: "Reset Password" }} />
        <Stack.Screen name="profile" options={{ headerTitle: "Profile" }} />
        <Stack.Screen name="profile/user-info" options={{ headerTitle: "User Info" }} />
        <Stack.Screen name="profile/settings" options={{ headerTitle: "Settings" }} />
        <Stack.Screen name="profile/change-email" options={{ headerTitle: "Change Email" }} />
        <Stack.Screen name="profile/change-password" options={{ headerTitle: "Change Password" }} />
        <Stack.Screen name="profile/change-theme" options={{ headerTitle: "Change Theme" }} />
        <Stack.Screen name="profile/delete-account" options={{ headerTitle: "Delete Account" }} />
        <Stack.Screen name="profile/logout" options={{ headerTitle: "Logout" }} />
        <Stack.Screen name="assets" options={{ headerTitle: "Assets" }} />
        <Stack.Screen name="add-asset" options={{ headerTitle: "Add Asset" }} />
      </Stack>
    </NativeBaseProvider>
  );
}

export default gestureHandlerRootHOC(RootLayout);
