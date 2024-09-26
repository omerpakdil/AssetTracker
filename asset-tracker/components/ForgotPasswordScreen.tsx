import React from 'react';
import { Alert } from 'react-native';
import { Button, Input, Stack, Box, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordScreen = () => {
  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const response = await fetch('http://192.168.1.104:3000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        Alert.alert('Success', 'Recovery email sent');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to send recovery email');
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F0F0F0">
      <Formik
        initialValues={{ email: '' }}
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
              <Button 
                colorScheme="dark" 
                _text={{ color: '#FFFFFF' }}
                bg="#333333"
                _hover={{ bg: '#2C2C2C' }}
                marginTop={4} 
                onPress={() => handleSubmit()}
              >
                Send Recovery Email
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPasswordScreen;
