import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReceiptScannerScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanningStatus, setScanningStatus] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        const manipResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 1000 } }],
          { format: 'jpeg', compress: 0.8 }
        );
        setCapturedImage(manipResult);
        setScanningStatus('Scanning receipt...');
        setTimeout(processReceipt, 2000); // Simulating processing delay
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    }
  };

  const processReceipt = () => {
    // In a real app, you'd use OCR (Optical Character Recognition) here
    // For this example, we'll just simulate the process
    setScanningStatus('Receipt scanned successfully!');
    setTimeout(() => {
      navigation.navigate('Add', {
        scannedExpense: {
          amount: 42.99,
          category: 'Groceries',
          date: new Date().toISOString().split('T')[0],
          description: 'Scanned receipt',
        },
      });
    }, 1000);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF' }]}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.preview} />
          <Text style={[styles.scanningStatus, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            {scanningStatus}
          </Text>
        </View>
      ) : (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Icon name="camera" size={36} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 30,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
  },
  scanningStatus: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReceiptScannerScreen;

