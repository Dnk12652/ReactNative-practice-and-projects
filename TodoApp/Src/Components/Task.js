import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import CustomButton from '../Utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setID, setTasks} from '../Redux/action';
import CheckBox from '@react-native-community/checkbox';
// import {ColorPicker} from 'react-native-color-picker';

export function Task({navigation}) {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [done, setTaskDone] = useState(false);
  const {tasks, id} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const onButtonHandler = () => {
    if (todo.length > 0) {
      var task = {
        todo: todo,
        description: description,
        id: id,
        isdone: done,
      };
      const index = tasks.findIndex(task => task.id === id);
      let newtask = [];
      console.log(index, id, 'index');
      if (index > -1) {
        newtask = [...tasks];
        newtask[index] = task;
      } else {
        newtask = [...tasks, task];
      }
      console.log(newtask);
      AsyncStorage.setItem('Tasks', JSON.stringify(newtask))
        .then(() => {
          dispatch(setTasks(newtask));
          navigation.navigate('To-Do');
        })
        .catch(() => {
          console.log('error occured while storing in store');
        });
    } else {
      Alert.alert('warning', "Task Field shouldn't be empty");
    }
  };
  const GetTask = () => {
    // if (id !== '') {
    let Task = tasks.find(task => task.id === id);
    if (Task) {
      setTodo(Task.todo);
      setDescription(Task.description);
    }
  };
  useEffect(() => {
    GetTask();
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Enter a Task:-</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={val => setTodo(val)}
          placeholder="Enter a Task"
          value={todo}
        />
      </View>
      <View>
        <Text style={styles.text}>Enter a Description:-</Text>
        <TextInput
          multiline
          onChangeText={val => setDescription(val)}
          style={styles.textinput}
          placeholder="Enter a Description"
          value={description}
        />
      </View>
      <View style={styles.checkbox}>
        <CheckBox
          value={done}
          onValueChange={newValue => setTaskDone(newValue)}
        />
        <Text style={styles.text}>Is Task done</Text>
      </View>
      {/* <View>
        <ColorPicker
          onColorSelected={color => Alert.alert(`Color selected: ${color}`)}
          style={{flex: 1}}
        />
      </View> */}
      <View style={styles.button}>
        <CustomButton
          onPressFunction={onButtonHandler}
          title={'Save Task'}
          color={'#5aed39'}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  textinput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 24,
    color: '#4501df',
    margin: 10,
  },
  button: {
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
