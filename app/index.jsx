import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Redirect, useRootNavigationState } from "expo-router";
import { useUser } from "@clerk/clerk-expo"
import { useEffect } from "react";


export default function Index() {
  const {user, isLoaded}=useUser()
  console.log('current User:', user);

  useEffect(()=>{
    checkNavLoader()
  },[])

  const checkNavLoader=()=>{
    if(!useRootNavigationState.key)
      return null;
  }
  return (
    <SafeAreaView style={styles.container}>
    {!user? <Redirect href={'/login'} /> : 
    <Redirect href={'/(tabs)/home'} /> }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

