import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, TextInput} from 'react-native';
import CustomButton from '../Utils/CustomButton';
import GlobalStyle from '../Utils/GlobalStyle';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge} from '../Redux/action';

export default function Home({navigation, route}) {
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
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        var user = {
          Name: name,
        };
        await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Welcome {name} !
      </Text>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Your age is {age}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={value => dispatch(setName(value))}
      />
      <CustomButton
        title="Update"
        color="#ff7f00"
        onPressFunction={updateData}
      />
      <CustomButton
        title="Remove"
        color="#f40100"
        onPressFunction={removeData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
});
