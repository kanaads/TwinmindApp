import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession(); // Required for proper redirect handling

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '433658787003-4jooa9omhgaea1tmgdelohvoeupoetvp.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
    responseType: 'token',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {

    console.log('🔄 Auth response:', response);
    
    if (response?.type === 'success') {

      const { accessToken } = response.authentication || {};

      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(res => res.json())
        .then(user => {
          login(user); // save to AuthContext
          router.replace('/home'); // navigate to /home
        })
        .catch(err => {
          console.error('❌ Failed to fetch user info', err);
          Alert.alert('Error', 'Could not fetch user info');
        });
    }

    if (response?.type === 'error') {
      console.error('❌ Login failed:', response.error);
      Alert.alert('Login Error', response.error?.message || 'Unknown error');
    }

    if (response?.type === 'dismiss') {
      console.warn('⚠️ User dismissed the login flow.');
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Login with Google</Text>
      {request ? (
        <Button title="Sign In with Google" onPress={() => promptAsync()} />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </View>
  );
}
