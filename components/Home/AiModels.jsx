import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../services/GlobalApi';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function AiModels({type}) {

    const [aiModelList, setAiModelList] = useState()
    const router = useRouter()

    useEffect(() => {
        console.log('type param', type)
        GetAiModels();
    }, [])

    const GetAiModels = async () => {
        try {
          console.log('Starting API call');
          const result = await GlobalApi.GetAiModels(type);
          console.log('API call completed');
          console.log('API Response:', result.data); // Log the response
          setAiModelList(result.data.data);
        } catch (error) {
          console.error('Error fetching AI models:', error);
        }
      };
      
      const OnClickModel = (item) => {
        router?.push({
            pathname:'FormInput',
            params:item
        })
      }

  return (
    <View>
      <Text style={{
        fontSize:20,
        marginTop:20,
        fontWeight:'bold',
        marginBottom:10
      }}>{type?.toUpperCase()}</Text>

      <FlatList 
        data={aiModelList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({item, index})=>(
            <TouchableOpacity onPress={()=>OnClickModel(item)} style={{
                marginRight:15
            }}>
                <Image source={{uri:item?.banner?.url}} 
                style={{
                    width:140,
                    height:180,
                    borderRadius:15,
                }}
                />
                <Text style={{
                    position:'absolute',
                    bottom:10,
                    color:Colors.WHITE,
                    width:'100%',
                    textAlign:'center',
                    fontWeight:'medium',
                    fontSize:15
                }}>{item.name}</Text>
            </TouchableOpacity>    
        )}
      />
    </View>
  )
}