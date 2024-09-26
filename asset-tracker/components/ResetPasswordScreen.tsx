import React from 'react';
import { Alert } from 'react-native';
import { Button, Input, Stack, Box, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordScreen = () => {
  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      const response = await fetch('http://192.168.1.104:3000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        Alert.alert('Success', 'Password reset successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to reset password');
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding={4} bg="#F0F0F0">
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <Box width="100%">
            <Stack space={4}>
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
              <Box>
                <Text>Confirm Password</Text>
                <Input
                  variant="underlined"
                  placeholder="Confirm Password"
                  type="password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword && errors.confirmPassword ? <Text color="red.500">{errors.confirmPassword}</Text> : null}
              </Box>
              <Button 
                colorScheme="dark" 
                _text={{ color: '#FFFFFF' }}
                bg="#333333"
                _hover={{ bg: '#2C2C2C' }}
                marginTop={4} 
                onPress={() => handleSubmit()}
              >
                Reset Password
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPasswordScreen;
