import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import Colors from '../constants/Colors';
import TextInput_ from '../components/FormInput/TextInput_';
import ImageUploadComponent from '../components/FormInput/ImageUploadComponent';

export default function FormInput() {
    const params = useLocalSearchParams();
    const navigation = useNavigation();
    const [aiModel, setAiModel] = useState();

    useEffect(() => {
        console.log("Params:", params)
        setAiModel(params)
        navigation.setOptions({
            headerShown:true,
            headerTitle:params?.name
        })
    },[])

  return (
    <View style={{
        padding:20,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontSize:20,
        fontWeight:'bold'
      }}>{aiModel?.name}</Text>

      <View>
        {aiModel?.userImageUpload!= "true" ? <TextInput_ /> : <ImageUploadComponent />} 
        <Text style={{
            color:Colors.GRAY,
            marginVertical:10
        }}>NOTE: 1 Credit will be used to generate AI Image</Text>
        <TouchableOpacity style={{
            padding:12,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginVertical:15,
            width:'100%',
            marginVertical:30
        }}>
            <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontSize:20
            }}>Generate</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}