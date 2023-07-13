import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setID, setTasks} from '../Redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

export function Todo({navigation}) {
  const {tasks, id} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    GetTasks();
  });
  const GetTasks = () => {
    AsyncStorage.getItem('tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks));
        }
      })
      .catch(err => console.log(err));
  };
  const onDeleteTask = id => {
    let index = tasks.findIndex(task => task.id === id);
    if (index > -1) {
      let newTasks = tasks.filter(task => task.id === index);
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('success!!!', 'Selected task deleted successfullly');
        })
        .catch(() => {
          console.log('error occured while storing in store');
        });
    }
  };
  const changeCheckValue = (val, id) => {
    let index = tasks.findIndex(task => task.id === id);
    if (index > -1) {
      let Newvalue = [...tasks];
      Newvalue[index].isdone = val;
      AsyncStorage.setItem('Tasks', JSON.stringify(Newvalue))
        .then(() => {
          dispatch(setTasks(Newvalue));
          Alert.alert('success!!!', 'Marked as task completed');
        })
        .catch(() => {
          console.log('error occured while storing in store');
        });
    }
  };
  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.isdone === false)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.Taskitems}
            onPress={() => {
              setID(item.id);
              navigation.navigate('AddTask');
            }}>
            <View style={styles.checkbox}>
              <CheckBox
                value={item?.isdone}
                onValueChange={newValue => {
                  changeCheckValue(newValue, item.id);
                  dispatch(setID(item.id));
                }}
              />
            </View>
            <View style={styles.parenttext}>
              <Text style={styles.text}>{item.todo}</Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.trashicon}
              onPress={() => onDeleteTask(id)}>
              <FontAwesome5 name={'trash'} size={20} color={'#ff0000'} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.addtodo}
        onPress={() => {
          dispatch(setID(tasks.length + 1));
          navigation.navigate('AddTask');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  addtodo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  Taskitems: {
    flexDirection: 'row',
    backgroundColor: '#66e3d9',
    borderRadius: 3,
    justifyContent: 'space-between',
    margin: 10,
    height: 'auto',
  },
  parenttext: {
    width: '40%',
    wordBreak: 'break-word',
  },
  text: {
    color: '#ffffff',
    padding: 5,
    fontSize: 25,
  },
  trashicon: {
    alignItems: 'center',
    paddingRight: 20,
    justifyContent: 'center',
    width: '20%',
  },
  checkbox: {
    paddingleft: 20,
    justifyContent: 'center',
    width: '20%',
  },
});
