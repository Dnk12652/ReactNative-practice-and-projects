import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import CustomButton from '../Utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, setAllUsers} from '../Redux/action';

export default function Login({navigation}) {
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUserData();
  }, []);
  const getAllUserData = async () => {
    const result = await fetch(
      'https://mocki.io/v1/6f1e9b71-e752-44f8-b568-0dc6938e3d09',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await result.json();
    if (json) {
      console.log(json);
      dispatch(setAllUsers(json));
      navigation.navigate('Home');
    } else {
      console.log('Unable to fetch!');
    }
  };
  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        var user = {
          Name: name,
          Age: age,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Redux</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => dispatch(setName(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={value => dispatch(setAge(value))}
      />
      <CustomButton title="Login" color="#1eb900" onPressFunction={setData} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 100,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
