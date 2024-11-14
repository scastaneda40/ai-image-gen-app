import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import GlobalApi from '../../services/GlobalApi';
import Colors from '../../constants/Colors'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'

const AiFeaturedModel = () => {

    const [aiModelList, setAiModelList] = useState([]);
    const router = useRouter()

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

    const OnClickAiModel = (item) => {
        router?.push({
            pathname:'FormInput',
            params:item
        })
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
            
            <TouchableOpacity onPress={()=>OnClickAiModel(item)} style={{
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
            </TouchableOpacity>   
        )}
      />
    </View>
  )
}

export default AiFeaturedModel