import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import Colors from './../../constants/Colors'
import { Link, useRouter } from 'expo-router'
import { useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { TouchableOpacity } from 'react-native'

export default function LoginScreen() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    const { user } = useUser();
  
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
        })
  
        if (createdSessionId) {
            console.log("CREATEd SESSION ID:", createdSessionId)
            router.replace('../(tabs)/home')
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
    }, [])
  
  return (
    <View>
      <Image source={require('./../../assets/images/login.jpg')} 
       style={{
           width: '100%',
           height:500
       }}
      />

      <View style={styles.loginContainer}>
          <Text style={{
              fontSize:30,
              fontWeight:'bold',
              textAlign:'center'
          }}>Welcome to ImagineAI</Text>

          <Text style={{
              color:Colors.GRAY,
              textAlign:'center',
              marginTop:15
          }}>Create AI Art in Just One Click</Text>
       <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{
              textAlign:'center',
              color:'white',
              fontSize:17
              }}>Continue</Text>
      </TouchableOpacity>

      <Text style={{
          textAlign:'center',
          marginTop:20,
          fontSize:13,
          color:Colors.GRAY
      }}>By continuing you agree to our terms and conditions</Text>
      </View>
    </View> 
  )
}

const styles = StyleSheet.create({
    loginContainer:{
        padding:25,
        marginTop: -20,
        backgroundColor: 'white',
        height:600,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    button:{
        width:'100%',
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:40,
        marginTop:20
    }
})

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()