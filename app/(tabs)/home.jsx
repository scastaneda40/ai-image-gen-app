import { View, FlatList } from 'react-native';
import React from 'react';
import Header from './../../components/Home/Header';
import Banner from './../../components/Home/Banner';
import AiFeaturedModel from '../../components/Home/AiFeaturedModel';
import AiModels from '../../components/Home/AiModels';

const Home = () => {
  return (
    <FlatList
      data={[1]} 
      contentContainerStyle={{
        padding: 20,
        marginTop: 20,
      }}
      renderItem={({ item }) => (
        <View>
          <Header />
          <Banner />
          <AiFeaturedModel />
          <AiModels type={'avatar'} />
          <AiModels type={'style'} />
          <View style={{ height: 100 }} />
        </View>
      )}
    />
  );
};

export default Home;
