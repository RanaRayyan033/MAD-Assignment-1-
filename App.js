import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const user = {
  name: 'Muhammad Riyan Rana ',
  skills: ['React Native', 'python'],
  bio: 'A passionate developer looking to share my skills with the world.',
};


// Login Screen
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === 'rayyan@gmail.com' && password === '12345') {
      setError('');
      navigation.replace('Home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>SkillSwap Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} color="#2E86C1" />
    </View>
  );
}

//Home Feed
function HomeScreen({ navigation, route }) {
  const [offers, setOffers] = useState([
    { id: '1', title: 'Python Tutoring', user: 'Ali', desc: 'Learn Python basics.' },
    { id: '2', title: 'c++ Lessons', user: 'Fatima', desc: 'c++ basio lesson for beginners.' },
    { id: '3', title: 'java', user: 'Ahmed', desc: 'java basic lesson for beginners' },
    { id: '4', title: 'gym', user: 'Sara', desc: 'desicpline.' },
  ]);

  // new post
  useEffect(() => {
    if (route.params?.newOffer) {
      setOffers((prev) => [
        ...prev,
        { id: Date.now().toString(), ...route.params.newOffer },
      ]);
    }
  }, [route.params?.newOffer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Offers</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('OfferDetail', { offer: item })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardUser}>By {item.user}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonRow}>
        <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} color="#28B463" />
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} color="#884EA0" />
      </View>
    </View>
  );
}

// Create Post
function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handlePost = () => {
    if (title.trim() !== '') {
      const newOffer = { title, user: 'You', desc };
      navigation.navigate('Home', { newOffer });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Skill Offer</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={styles.input}
      />
      <Button title="Post" onPress={handlePost} color="#E67E22" />
    </View>
  );
}

//Offer Detail Page
function OfferDetailScreen({ route }) {
  const { offer } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.subtitle}>By: {offer.user}</Text>
      <Text style={styles.smallText}>{offer.desc || 'No description given.'}</Text>
      <View style={{ marginTop: 10 }}>
        <Button title="Book Session" onPress={() => alert('Booking feature coming soon!')} color="#C0392B" />
      </View>
    </View>
  );
}

//Profile
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>Bio:</Text>
      <Text style={styles.smallText}>{user.bio}</Text>
      <Text style={styles.subtitle}>Skills:</Text>
      {user.skills.map((skill, idx) => (
        <Text key={idx} style={styles.smallText}>- {skill}</Text>
      ))}
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="OfferDetail" component={OfferDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//  Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F4F6F7',
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#EBF5FB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#34495E',
  },
  smallText: {
    fontSize: 13,
    marginTop: 4,
    color: '#566573',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 8,
    borderRadius: 5,
    fontSize: 13,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D5DBDB',
    elevation: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1A5276',
  },
  cardUser: {
    marginTop: 3,
    fontSize: 12,
    color: '#566573',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
