import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

const AiFeaturedModel = () => {

    const [aiModelList, setAiModelList] = useState([]);

    useEffect(() => {
        GetAiModelFeaturedList();
    },[])

    const GetAiModelFeaturedList = async () => {
        const result = await GlobalApi.GetFeaturedCategoryList()
        setAiModelList(result.data.data)
        console.log('ai model', result.data.data)
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
        renderItem={({item, index})=> (
            <View>
                <View>
                <Image source={{uri:item?.icon?.url}}
                    style={{
                        width:35,
                        height:35
                    }} 
                    />
                </View>
            </View>   
        )}
      />
    </View>
  )
}

export default AiFeaturedModel