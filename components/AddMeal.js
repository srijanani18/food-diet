import { StyleSheet, Text, TextInput, View ,Button} from 'react-native'
import React,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import { UserData, getFoodNutritionData ,db,getFoodDataData,setFoodDataData, getLastId} from '../FireBase'
import { useNavigation } from '@react-navigation/native'
const AddMeal = () => {
  const navigation=useNavigation()
    const [MealType,setMealType]=useState("")
    const [Meal,setMeal]=useState("")
    const [Grams,setGrams]=useState("")
    const [MealDropDown,setMealDropDown]=useState([])
    function getDateWeek(date) {
      const currentDate = 
          (typeof date === 'object') ? date : new Date();
      const januaryFirst = 
          new Date(currentDate.getFullYear(), 0, 1);
      const daysToNextMonday = 
          (januaryFirst.getDay() === 1) ? 0 : 
          (7 - januaryFirst.getDay()) % 7;
      const nextMonday = 
          new Date(currentDate.getFullYear(), 0, 
          januaryFirst.getDate() + daysToNextMonday);
   
      return (currentDate < nextMonday) ? 52 : 
      (currentDate > nextMonday ? Math.ceil(
      (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
  }
    const handleSubmit=async()=>
    {
      const CurDate=new Date()
      const response=await getFoodDataData(db)
      const lastid=getLastId(response)
      await setFoodDataData(db,lastid+1,{
        MealType,
        Meal,
        Grams,
        Date:CurDate.getDate(),
        Month:CurDate.getMonth()+1,
        PhoneNumber:UserData.PhoneNumber,
        WeekNo:getDateWeek(),
        Year:CurDate.getFullYear()
      })
      navigation.navigate("Dasboard1")
    }
    const getMealDropDown=async()=>
    {
      const MealDropDown= await getFoodNutritionData(db)
      var sampleDropDown=[]
      for(i=0;i<MealDropDown.length;i++)
      {
        sampleDropDown.push({
          label:MealDropDown[i].Type,
          value:MealDropDown[i].Type
        })
      }
      setMealDropDown(sampleDropDown)
    }
    useEffect(()=>
    {
      getMealDropDown()
    },[])
  return (
    <SafeAreaView>
        <View style={{backgroundColor:'black',marginTop:30}}>
            <Text style={[styles.textColor,{fontWeight:'900',fontSize:30,marginLeft:20,color:'#85a4e4',marginTop:10}]}>DineData</Text>
            <Text style={[styles.textColor,{fontWeight:'300',marginLeft:20}]}>Health meets data</Text>
            <Text style={[styles.textColor,{fontWeight:'800',marginLeft:120,marginTop:120,marginBottom:20}]} >Feed Your Today Meal</Text>
            <Dropdown style={styles.dropdown} 
            data={[{label:'BreakFast',value:'BreakFast'},{label:'Lunch',value:'Lunch'},{label:'Dinner',value:'Dinner'},{label:'Other',value:'Other'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            labelField="label"
            valueField="value" 
            placeholder='Select Meal Type'
            value={MealType}
            onChange={item=>
            {
                setMealType(item.value)
            }}
            />
            <Dropdown style={styles.dropdown} 
            data={MealDropDown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            labelField="label"
            valueField="value" 
            search
            searchPlaceholder='Search your meal'
            placeholder='Select Your Meal'
            value={Meal}
            onChange={item=>
            {
                setMeal(item.value)
            }}
            />
            <TextInput style={[{...styles.input,marginTop:30}]} 
            placeholder="Enter No of Grams"
            value={Grams}
            placeholderTextColor={'white'}
            onChangeText={text=>setGrams(text)}
            keyboardType="number-pad"
            />
            <View style={styles.button}>
                <Button title='Submit' color='#85a4e4' onPress={handleSubmit}/>
            </View>
    </View>
    </SafeAreaView>
  )
}
export default AddMeal

const styles = StyleSheet.create({   
    testColor:{
    color:'white'
    },   textColor:{
        color:'white'
    },dropdown: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        padding:10,
        width:300,
        marginLeft:60,
        marginTop:20,
      },  
      placeholderStyle: {
        color:'white',
        fontSize:15,
        fontWeight:400
      },
      selectedTextStyle: {
        fontSize: 15,
        color:'white'
      }, input:{
        borderWidth:1,
        height:40,
        width:300,
        paddingLeft:10,
        marginLeft:60,
        marginTop:15,
        borderColor:'white',
        color:'white'
    }, button:{
        width:150,
        marginTop:40,
        marginLeft:120,
        marginBottom:230
      }
})