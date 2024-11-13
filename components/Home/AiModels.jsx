import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../services/GlobalApi';
import { FlatList } from 'react-native';
import Colors from '../../constants/Colors';

export default function AiModels({type}) {

    const [aiModelList, setAiModelList] = useState()

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
            <View style={{
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
            </View>    
        )}
      />
    </View>
  )
}