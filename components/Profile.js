import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserData,getProfileData,db } from '../FireBase'
const Profile = () => {
  const [ProfileData,setProfileData]=useState(null)
  const GenProfileData=async ()=>
  {
    console.log(UserData)
    const CurProfiledata=await getProfileData(db)
    for(i=0;i<CurProfiledata.length;i++)
    {
      if(CurProfiledata[i].PhoneNumber==UserData.PhoneNumber)
      {
        console.log(CurProfiledata[i])
        setProfileData(CurProfiledata[i])
      }
    }
  }
  useEffect(()=>
  {
    GenProfileData()
  },[])
  return (
    <SafeAreaView>
        <View style={{backgroundColor:'black',marginTop:30}}>
        <Text style={[styles.textColor,{fontWeight:'900',fontSize:30,marginLeft:20,color:'#85a4e4',marginTop:10}]}>DineData</Text>
            <Text style={[styles.textColor,{fontWeight:'300',marginLeft:20}]}>Health meets data</Text>
            <Text style={{fontSize:25,fontWeight:900,marginLeft:160,marginTop:250,color:'white',marginTop:150}}>Profile</Text>
           {ProfileData!=null? <View style={{marginTop:50,marginLeft:100}}>
            <Text style={{marginTop:10,fontSize:18,fontWeight:900,color:'white'}}>Name: {ProfileData.Name}</Text>
            <Text style={{marginTop:10,fontSize:18,fontWeight:900,color:'white'}}>City : {ProfileData.City}</Text>
            <Text style={{marginTop:10,fontSize:18,fontWeight:900,color:'white'}}>Age : {ProfileData.Age}</Text>
            <Text style={{marginTop:10,fontSize:18,fontWeight:900,color:'white',marginBottom:270}}>Phone Number: {ProfileData.PhoneNumber}</Text>
            </View>:null}
        </View>
  </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({   textColor:{
    color:'white',
    marginLeft:15
}})