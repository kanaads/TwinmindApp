import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, Button, Platform, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

WebBrowser.maybeCompleteAuthSession();

// Pure JavaScript base64url decoder
function base64UrlDecode(str: string): string {
  // Convert base64url to base64 by replacing characters
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding
  const pad = base64.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;

  // Convert groups of four characters to three bytes
  const binString = padded.replace(/[^A-Za-z0-9+/=]/g, '').split('').map((c, i, a) => {
    const bytes = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'.indexOf(c).toString(2).padStart(6, '0');
    return i % 4 === 0 ? bytes : '';
  }).join('');

  // Convert binary string to UTF-8
  const bytes = new Uint8Array(Math.floor(binString.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(binString.substr(i * 8, 8), 2);
  }

  // Decode UTF-8
  return new TextDecoder().decode(bytes);
}

export default function LoginScreen() {
  const { login } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "433658787003-4jooa9omhgaea1tmgdelohvoeupoetvp.apps.googleusercontent.com",
    webClientId: "433658787003-4jooa9omhgaea1tmgdelohvoeupoetvp.apps.googleusercontent.com",
    iosClientId: "433658787003-4jooa9omhgaea1tmgdelohvoeupoetvp.apps.googleusercontent.com",
    clientId: "433658787003-4jooa9omhgaea1tmgdelohvoeupoetvp.apps.googleusercontent.com",
    responseType: "token",
    redirectUri: Platform.select({
      web: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
      android: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
      ios: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
      default: 'https://auth.expo.io/@kanaads/twinmind-internship-app'
    }),
    usePKCE: false,
    scopes: ['openid', 'profile', 'email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      
      console.log('Authentication successful:', response.params);
      
      if (!access_token) {
        console.error('No access token received');
        Alert.alert('Error', 'No access token received from Google');
        return;
      }

      // Fetch user info using the access token
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
      })
        .then(response => response.json())
        .then(data => {
          console.log('User info:', data);
          const user = {
            email: data.email,
            name: data.name,
            picture: data.picture
          };
          login(user);
          router.replace('/home');
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
          Alert.alert('Error', 'Failed to fetch user information');
        });
    } else if (response?.type === 'error') {
      console.error('Authentication error:', response.error);
      Alert.alert('Login Error', 'Failed to authenticate with Google');
    }
  }, [response, login]);

  const handleLogin = async () => {
    try {
      console.log('Starting auth with config:', {
        platform: Platform.OS,
        redirectUri: Platform.select({
          web: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
          android: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
          ios: 'https://auth.expo.io/@kanaads/twinmind-internship-app',
          default: 'https://auth.expo.io/@kanaads/twinmind-internship-app'
        })
      });
      
      await promptAsync();
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to start login process');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Login with Google</Text>
      {request ? (
        <Button title="Sign In with Google" onPress={handleLogin} />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </View>
  );
}