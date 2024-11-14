import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploadComponent({ uploadedImage }) { // Destructuring prop correctly
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
        uploadedImage(result.assets[0].uri); // Assuming uploadedImage is a prop function
        setImage(result.assets[0].uri);
      }
      
  };

//   useEffect(() => {
//     console.log('Current image state after update:', image);
//   }, [image]);

  return (
    <View>
      <Text style={{ marginVertical: 5 }}>Upload your image</Text>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          padding: 50,
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 15,
          marginVertical: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {image ? ( 
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: 300, borderRadius: 15 }}
          />
        ) : (
          <Image
            source={require('./../../assets/images/upload.png')}
            style={{ width: 70, height: 70 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
