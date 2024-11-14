import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker';


export default function ImageUploadComponent() {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

  return (
    <View>
      <Text style={{
        marginVertical:5
      }}>Upload your image</Text>
      <TouchableOpacity 
        onPress={pickImage}
      
      style={{
        padding:50,
        backgroundColor:Colors.LIGHT_GRAY,
        borderRadius:15,
        marginVertical:10,
        width:'100%',
        display:'flex',
        alignItems:'center'
      }}>
        <Image source={require('./../../assets/images/upload.png')}
            style={{
                width:70,
                height:70
            }}
        />

      </TouchableOpacity>
    </View>
  )
}