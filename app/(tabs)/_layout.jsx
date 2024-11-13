import { View, Text } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorSpace } from 'react-native-reanimated';
import Colors from './../../constants/Colors';
import {useUser} from '@clerk/clerk-expo';
import GlobalApi from '../../services/GlobalApi';
import { UserDetailContext } from '../../context/UserDetailContext';

const TabLayout = () => {

  const {user} = useUser()
  const {useDetail, setUserDetail} = useContext(UserDetailContext);

  useEffect(() => {
    user&&VerifyUser()
  }, [user])
  const VerifyUser = async () => {
      const result = await GlobalApi.GetUserInfo(user?.primaryEmailAddress?.emailAddress);
      console.log(result.data.data)

      if(result.data.data.length!=0)
      {
          setUserDetail(result.data.data[0])
          return ;
      }

      try{
        const data = {
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userName:user?.fullName 
        }
        const result = await GlobalApi.CreateNewUser(data);
        console.log(result?.data.data);
        setUserDetail(result.data.data[0])
      }catch(e){

      }
    }
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name='home'
        options={{
            title:'Home',
            tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='collection' 
        options={{
            title:'Home',
            tabBarIcon:({color})=><Ionicons name="folder-open" size={24}  color={color} />
        }}
        />
        <Tabs.Screen name='profile' 
        options={{
            title:'Home',
            tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />
        }}
        />
    </Tabs>
  )
}

export default TabLayout