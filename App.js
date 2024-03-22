import { StyleSheet, Text, View ,Image} from 'react-native';
import Login from './components/Login';
import Registration from './components/Registration';
import Dasboard from './components/Dasboard';
import Report from './components/Report';
import AddMeal from './components/AddMeal';
import Profile from './components/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
export default function App() {
  const Stack=createStackNavigator()
  const BottomTab=createMaterialBottomTabNavigator()
  const AddStack=createStackNavigator()
  function AddStackNavigator()
  {
    return(
      <AddStack.Navigator screenOptions={{headerShown: false}}>
        <AddStack.Screen name="Dasboard1" component={Dasboard}/>
        <AddStack.Screen name="Addmeal" component={AddMeal}/>
      </AddStack.Navigator>
    )
  }
  function BottomTabNavigator()
  {
    return(
      <BottomTab.Navigator style={{marginTop:-30}} >
          <BottomTab.Screen name='Dasboard'  options={{tabBarIcon:()=><Image source={require("./assets/dashboard.png")}/>}}
          component={AddStackNavigator}  />
          <BottomTab.Screen name='Report' component={Report} options={{tabBarIcon:()=><Image source={require("./assets/report.png")}/>}} />
          <BottomTab.Screen name='Profile' component={Profile} options={{tabBarIcon:()=><Image source={require("./assets/user2.png")}/>}} />
      </BottomTab.Navigator>
    )
  }
  function StackNavigator(){
    return (
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
        <Stack.Screen name='Registration' component={Registration} />
      </Stack.Navigator>
    )
  }
  return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({

});
