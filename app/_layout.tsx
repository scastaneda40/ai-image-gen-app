import { Stack } from "expo-router";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { UserDetailContext } from './../context/UserDetailContext';

export default function RootLayout() {

  const [userDetail, setUserDetail] = useState();

  const tokenCache = {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        console.log('Retrieved token:', item);
        return item;
      } catch (error) {
        console.error('SecureStore get token error:', error);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        console.log('Saving token:', value);
        await SecureStore.setItemAsync(key, value);
      } catch (err) {
        console.error('SecureStore save token error:', err);
      }
    },
  };
  

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
  console.log('pub key', publishableKey);

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
          <Stack screenOptions={{
            headerShown:false
          }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="login/index" />
          </Stack>
        </UserDetailContext.Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
