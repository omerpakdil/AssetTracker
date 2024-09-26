import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  purchasePrice: Yup.number().required('Purchase Price is required').positive('Purchase Price must be a positive number'),
  quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
  type: Yup.string().required('Type is required'),
});

const AddAssetScreen: React.FC = () => {

  const router = useRouter();
  
  const handleAddAsset = async (values: any) => {

    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('http://192.168.1.104:3000/assets', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
 
      ToastAndroid.show('Asset başarıyla oluşturuldu!', ToastAndroid.SHORT);

      router.replace('/assets');
    } catch (error) {
      console.error('Error adding asset:', error);
      Alert.alert('Error', 'An error occurred while adding the asset');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: '', purchasePrice: '', quantity: '', type: '' }}
        validationSchema={validationSchema}
        onSubmit={handleAddAsset}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Asset</Text>
            <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              
              <TextInput
                style={styles.input}
                placeholder="Purchase Price"
                keyboardType="numeric"
                onChangeText={handleChange('purchasePrice')}
                onBlur={handleBlur('purchasePrice')}
                value={values.purchasePrice}
              />
              {touched.purchasePrice && errors.purchasePrice && <Text style={styles.errorText}>{errors.purchasePrice}</Text>}
              
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                onChangeText={handleChange('quantity')}
                onBlur={handleBlur('quantity')}
                value={values.quantity}
              />
              {touched.quantity && errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}
              
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: 'Select Type...', value: '' }}
                onValueChange={handleChange('type')}
                value={values.type}
                items={[
                  { label: 'Cryptocurrency', value: 'Cryptocurrency' },
                  { label: 'Stock', value: 'Stock' },
                  { label: 'Fund', value: 'Fund' },
                ]}
              />
              {touched.type && errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
              
              <Button title="Add Asset" onPress={() => handleSubmit()} />
              <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Formik>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 15,
    padding: 10,
  },
  inputAndroid: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 15,
    padding: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  formContent: {
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 15,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#DDD',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
  },
});

export default AddAssetScreen;
