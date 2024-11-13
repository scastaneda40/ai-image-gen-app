import { View, Text } from 'react-native'
import React from 'react'
import Header from './../../components/Home/Header'
import Banner from './../../components/Home/Banner'
import AiFeaturedModel from '../../components/Home/AiFeaturedModel'

const Home = () => {
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>   
      <Header />
      <Banner />
      <AiFeaturedModel />
    </View>
  )
}

export default Home