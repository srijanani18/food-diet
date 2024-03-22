import { StyleSheet,Text, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'
const Meal = (props) => {
  return (
    <View style={styles.mealCard}>
        <Text style={[styles.testColor,{color:'#e3a357',fontSize:15,fontWeight:800,marginBottom:10}]}>{props.Type}</Text>
        <View>
            {props.Food.map((value,index)=><Text key={index} style={[styles.testColor]}>{value.MealType} {value.Grams}g</Text>)}
        </View>
    </View>
  )
}

export default Meal

const styles = StyleSheet.create({
    testColor:{
        color:'white'
    },
    mealCard:{
        backgroundColor:'#2a2a2a',
        marginTop:15,
        paddingLeft:20,
        marginLeft:40,
        marginRight:40,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:20,
        marginBottom:30
    }
})