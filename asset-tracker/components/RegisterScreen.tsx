import React from 'react';
import { Alert } from 'react-native';
import { Button, Input, Stack, Box, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const RegisterScreen = () => {

 const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const response = await fetch('http://192.168.1.104:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        Alert.alert('Success', 'User registered successfully');
        setTimeout(() => router.push('/'), 1500);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to register');
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F7F7F7">
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Box width="100%">
            <Stack space={4}>
              <Box>
                <Text fontSize="md" color="#333333">Username</Text>
                <Input
                  variant="underlined"
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  _focus={{ borderColor: '#000000' }}
                />
                {touched.username && errors.username ? <Text color="#D32F2F">{errors.username}</Text> : null}
              </Box>
              <Box>
                <Text fontSize="md" color="#333333">Email</Text>
                <Input
                  variant="underlined"
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  _focus={{ borderColor: '#000000' }}
                />
                {touched.email && errors.email ? <Text color="#D32F2F">{errors.email}</Text> : null}
              </Box>
              <Box>
                <Text fontSize="md" color="#333333">Password</Text>
                <Input
                  variant="underlined"
                  placeholder="Password"
                  type="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  _focus={{ borderColor: '#000000' }}
                />
                {touched.password && errors.password ? <Text color="#D32F2F">{errors.password}</Text> : null}
              </Box>
              <Button 
                colorScheme="dark" 
                _text={{ color: '#FFFFFF' }}
                bg="#333333"
                _hover={{ bg: '#2C2C2C' }}
                marginTop={4}
                onPress={() => handleSubmit()}>
                Register
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterScreen;
