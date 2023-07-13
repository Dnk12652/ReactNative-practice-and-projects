import React, {Component, useEffect} from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

export function TodoEnterance({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Todo_Tabs');
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../Assets/checklist.png')}
      />
      <Text style={styles.text}> Naveen Todo App </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
    margin: 20,
  },
  text: {
    color: '#16a7f5',
    fontSize: 30,
  },
});

export default TodoEnterance;
