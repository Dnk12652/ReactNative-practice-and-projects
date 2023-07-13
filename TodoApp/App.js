import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Src/Components/Home';
import Login from './Src/Components/Login';
import {Provider} from 'react-redux';
import {Store} from './Src/Redux/store';
import TodoEnterance from './Src/Components/TodoEnterance';
import {Todo} from './Src/Components/Todo';
import {Done} from './Src/Components/Done';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Task} from './Src/Components/Task';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function TodoTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'To-Do') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0080ff',
        inactiveTintColor: '#777777',
        labelStyle: {fontSize: 15, fontWeight: 'bold'},
      }}>
      <Tab.Screen name={'To-Do'} component={Todo} />
      <Tab.Screen name={'Done'} component={Done} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Entrance"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Entrance"
            component={TodoEnterance}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="AddTask" component={Task} />
          <Stack.Screen name="Todo_Tabs" component={TodoTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
