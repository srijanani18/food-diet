import { StyleSheet,Text, View ,Image, TextInput, Button,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { getProfileData,db } from '../FireBase'
import { UserData } from '../FireBase'
const Login = () => {
  const[PhoneNumber,setPhoneNumber]=useState('')
  const[Password,setPassword]=useState('')
  const[Error,setError]=useState(0)
  const Navigation=useNavigation()
  const handelLogin=async()=>
  {
    if(PhoneNumber.length!=10||Password.length<3)
    {
      setError(1)
      return
    }
    else{
      const CurProfiledata=await getProfileData(db)
      var t=0;
      for(i=0;i<CurProfiledata.length;i++)
      {
        if(CurProfiledata[i].PhoneNumber==PhoneNumber&&CurProfiledata[i].Password==Password)
        {
          t=1;
          UserData.ID=CurProfiledata[i].id
          UserData.Name=CurProfiledata[i].Name
          UserData.PhoneNumber=CurProfiledata[i].PhoneNumber
          Navigation.navigate('BottomTabNavigator')
        }
      }
      if(t==0)
      {
        setError(1)
      }
    }
  }
  //api()
  return (
    <SafeAreaView>
      <View style={{backgroundColor:'black'}}>
        <Image source={require("../assets/nutrition.png")} style={{width:100,height:100,marginTop:150,marginLeft:160}}/>
        <Text style={{marginLeft:175,marginTop:30,fontWeight:800,fontSize:18,color:'white'}}>Login</Text>
        {Error==1?<Text style={{color:'red',fontWeight:800,marginLeft:140,marginTop:20}}>Enter Valid Detail</Text>:null}
        <TextInput placeholderTextColor={'white'} onChangeText={(value)=>setPhoneNumber(value)} placeholder='Enter Your Mobile No' style={styles.input}  keyboardType='numeric'/>
        <TextInput placeholderTextColor={'white'} placeholder='Enter Password' onChangeText={(value)=>setPassword(value)} secureTextEntry style={[{...styles.input},{marginTop:20}]}  />
        <View style={styles.button}>
        <Button title='Login' color='#85a4e4' onPress={handelLogin} />
        </View>
        <TouchableOpacity style={{marginLeft:100,marginTop:20,marginBottom:270}} onPress={()=>Navigation.navigate('Registration')}>
          <Text style={{color:'#85a4e4',marginLeft:15}}>New Account click here! {'->'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  input:{
    borderColor:'white',
    width:250,
    borderWidth:0.5,
    height:35,
    marginLeft:90,
    marginTop:30,
    paddingLeft:10,
    color:'white',
  },
  button:{
    width:150,
    marginTop:40,
    marginLeft:130
  }
})