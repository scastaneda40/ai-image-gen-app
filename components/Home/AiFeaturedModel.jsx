import { View, Text, FlatList, Image } from 'react-native'
import GlobalApi from '../../services/GlobalApi';
import Colors from '../../constants/Colors'
import React, { useEffect, useState } from 'react'

const AiFeaturedModel = () => {

    const [aiModelList, setAiModelList] = useState([]);

    useEffect(() => {
        GetAiModelFeaturedList();
    },[])

    const GetAiModelFeaturedList = async () => {
        console.log('function called')
        const result = await GlobalApi.GetFeaturedCategoryList();
        console.table('ai model', result.data.data)
        console.log('THE AI MODEL STUFF', result.data.data)

        setAiModelList(result.data.data)
    }
  return (
    <View style={{
        marginTop:20
    }}>
      <Text style={{
          fontSize:25,
          fontWeight:'bold'
      }}>FEATURED</Text>

      <FlatList
        data={aiModelList}
        numColumns={4}
        style={{marginTop:7}}
        renderItem={({item, index})=> (
            
            <View style={{
                flex:1,
                alignItems:'center'
            }}>
                <View style={{
                    padding:10,
                    borderRadius:8,
                    backgroundColor:Colors.LIGHT_GRAY,
                    borderRadius:7
                }}>
                <Image source={{uri:item?.icon?.url}}
                    style={{
                        width:35,
                        height:35
                    }} 
                    />
                </View>
                <Text style={{
                    fontSize:11,
                    textAlign:'center',
                    color:Colors.PRIMARY,
                    marginTop:2
                }}>{item?.name}</Text>
            </View>   
        )}
      />
    </View>
  )
}

export default AiFeaturedModel