import React from 'react';
import { Alert } from 'react-native';
import { Button, Input, Stack, Box, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await fetch('http://192.168.1.104:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        await AsyncStorage.setItem('token', token);

        Alert.alert('Success: ', data.message);
        router.push('/dashboard');
      } else {
        Alert.alert('Error', 'Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F0F0F0">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Box width="100%">
            <Stack space={4}>
              <Box>
                <Text>Email</Text>
                <Input
                  variant="underlined"
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email ? <Text color="red.500">{errors.email}</Text> : null}
              </Box>
              <Box>
                <Text>Password</Text>
                <Input
                  variant="underlined"
                  placeholder="Password"
                  type="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password ? <Text color="red.500">{errors.password}</Text> : null}
              </Box>
              <Button 
                colorScheme="dark" 
                _text={{ color: '#FFFFFF' }}
                bg="#333333"
                _hover={{ bg: '#2C2C2C' }}
                marginTop={4} 
                onPress={() => handleSubmit()}
              >
                Login
              </Button>
              <Button 
                variant="link"
                _text={{ color: '#4A4A4A' }}
                onPress={() => router.push('/forgot-password')}
              >
                Forgot Password?
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default LoginScreen;
