import { StyleSheet, Text, View ,TextInput, Button} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { getProfileData,getLastId,db,setProfileData } from '../FireBase'
const Registration = () => {
    const [Name,setName]=useState('')
    const [City,setCity]=useState('')
    const [Age,setAge]=useState('')
    const [Password,setPassword]=useState('')
    const [PhoneNumber,setPhoneNumber]=useState('')
    const [Error,setError]=useState(0)
    const Navigation=useNavigation()
    const handelSubmit=async()=>
    {
      setError(0)
      if(Name.length<3||City.length<3||Age<1||Password.length<3||PhoneNumber.length<10)
      {
        setError(1)
        return
      }else{
        const CurProfiledata=await getProfileData(db)
        const Lastid=getLastId(CurProfiledata)
        await setProfileData(db,Lastid+1,{
          Name,City,Age,Password,PhoneNumber
        })
        Navigation.navigate('Login')
      }
    }
  return (
    <SafeAreaView>
      <View style={{backgroundColor:'black'}}>
      <Text style={{color:'#85a4e4',fontWeight:800,fontSize:18,marginTop:200,marginLeft:145}}>Registration</Text>
      {Error==1?<Text style={{color:'red',fontWeight:800,marginLeft:140,marginTop:20}}>Enter Valid Detail</Text>:null}
            <TextInput style={[{...styles.input,marginTop:30}]} 
            placeholder="Enter Your Name"
            value={Name}
            placeholderTextColor={'white'}
            onChangeText={text=>setName(text)}
            keyboardType="default"/>
              <TextInput style={styles.input} 
            placeholder="Enter Your City"
            value={City}
            placeholderTextColor={'white'}
            onChangeText={text=>setCity(text)}
            keyboardType="default"/>
             <TextInput style={styles.input} 
            placeholder="Enter Your Age"
            value={Age}
            placeholderTextColor={'white'}
            onChangeText={text=>setAge(text)}
            keyboardType="numeric"/>
             <TextInput style={styles.input} 
            placeholder="Enter Your Phone Number"
            value={PhoneNumber}
            placeholderTextColor={'white'}
            onChangeText={text=>setPhoneNumber(text)}
            keyboardType="numeric"/>
            <TextInput style={styles.input} 
            placeholder="Enter Your Password"
            value={Password}
            placeholderTextColor={'white'}
            onChangeText={text=>setPassword(text)}
            keyboardType="default"/>
            <View style={styles.button}>
                <Button title='Submit' onPress={handelSubmit} color='#85a4e4'/>
            </View>
      </View>
    </SafeAreaView>
  )
}

export default Registration

const styles = StyleSheet.create({
    input:{
        borderWidth:0.5,
        height:35,
        width:250,
        paddingLeft:10,
        marginLeft:80,
        marginTop:15,
        borderColor:'white',
        color:'white'
    },
    button:{
        width:150,
        marginTop:40,
        marginLeft:120,
        marginBottom:295
      }
})