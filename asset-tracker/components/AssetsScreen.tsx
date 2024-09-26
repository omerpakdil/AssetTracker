import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon library

interface Asset {
  _id: string;
  name: string;
  purchasePrice: number;
  quantity: number;
  type: string;
}

const AssetListScreen = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const router = useRouter();

  const fetchAssets = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.1.104:3000/assets', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleUpdate = (id: string) => {
    router.push(`/assets/update-asset/${id}`);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Asset',
      'Are you sure you want to delete this asset?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              await axios.delete(`http://192.168.1.104:3000/assets/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              setAssets(assets.filter(asset => asset._id !== id)); // Remove the asset from the list
            } catch (error) {
              console.error('Error deleting asset:', error);
              Alert.alert('Error', 'An error occurred while deleting the asset');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Asset }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>${item.purchasePrice.toFixed(2)}</Text>
        <Text style={styles.itemText}>{item.quantity} units</Text>
        <Text style={styles.itemText}>{item.type}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleUpdate(item._id)}>
          <Icon name="edit" size={24} color="#007BFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
          <Icon name="delete" size={24} color="#C53030" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/assets/add-asset')}
      >
        <Text style={styles.addButtonText}>Add Asset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 16,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AssetListScreen;
