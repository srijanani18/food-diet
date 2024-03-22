import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import Meal from './Meal';
import { UserData } from '../FireBase';
import { useNavigation } from '@react-navigation/native';
import { getDayData } from '../PieChart';
import { db,getFoodDataData,getFoodNutritionData } from '../FireBase';
const data = [
    {
      name: "Protien",
      population: 1.6,
      color: "#4979f6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Carbohydrates",
      population: 12,
      color: "#FFC0CB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Fat",
      population: 0.4,
      color: "#9933FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Fiber",
      population: 0.4,
      color: "#AACCFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];
  chartConfig={
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
const Dasboard = () => {
  const Navigation=useNavigation()
  const [Data,setData]=useState([
    {
      name: "Protien",
      population: 0,
      color: "#4979f6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Carbohydrates",
      population: 0,
      color: "#FFC0CB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Fat",
      population: 0,
      color: "#9933FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Fiber",
      population: 0,
      color: "#AACCFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ])
  const [TodayMealsData,setTodayMealsData]=useState([])
      var TodayMeals=[{
        Type:'BreakFast',
        Food:[]
    },
        {
        Type:'Lunch',
        Food:[]
    },{
        Type:'Dinner',
        Food:[]
    },{
        Type:'Other',
        Food:[]
    }]
  const getDayData=async()=>
  {
    const responseFoodData=await getFoodDataData(db)
    const responseNutitionData=await getFoodNutritionData(db)
   // console.log(responseFoodData)
   // console.log(responseNutitionData)
    const date=new Date()
    var Nutrition={
        Protien:0,
        Carbohydrates:0,
        Fat:0,
        Fiber:0
    }
    for(i=0;i<responseFoodData.length;i++)
    {
        
        if(responseFoodData[i].PhoneNumber==UserData.PhoneNumber&&responseFoodData[i].Date==20&&responseFoodData[i].Month==date.getMonth()+1&&responseFoodData[i].Year==date.getFullYear())
        {
           
           for(j=0;j<responseNutitionData.length;j++)
           {
            if(responseNutitionData[j].Type==responseFoodData[i].Meal)
            {
               for(k=0;k<TodayMeals.length;k++)
               {
                if(TodayMeals[k].Type==responseFoodData[i].MealType)
                {
                    TodayMeals[k].Food.push({
                      MealType:responseFoodData[i].Meal,
                      Grams:responseFoodData[i].Grams
                    })
                }
               }
                Nutrition.Protien+=(responseFoodData[i].Grams*responseNutitionData[j].Protien)/100
                Nutrition.Carbohydrates+=(responseFoodData[i].Grams*responseNutitionData[j].Carbohydrates)/100
                Nutrition.Fat+=(responseFoodData[i].Grams*responseNutitionData[j].Fat)/100
                Nutrition.Fiber+=(responseFoodData[i].Grams*responseNutitionData[j].Fiber)/100
            }
           }
        }
    }
    for(i in Nutrition)
    {
      for(j=0;j<data.length;j++)
      {
        if(data[j].name==i)
        {
          data[j].population=Nutrition[i]
        }
      }
    }
    setData(data)
    setTodayMealsData(TodayMeals)
  }
  useEffect(()=>
  {
    getDayData()
  },[])
  return (
    <SafeAreaView>
        <View style={{marginTop:30,backgroundColor:'black'}}>
            <Text style={[styles.textColor,{fontWeight:'900',fontSize:30,marginLeft:20,color:'#85a4e4',marginTop:10}]}>DineData</Text>
            <Text style={[styles.textColor,{fontWeight:'300',marginLeft:20}]}>Health meets data</Text>
            <Text style={[styles.textColor,{fontWeight:'300',marginTop:30}]}>{`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`}</Text>
            <Text style={[styles.textColor,{fontSize:20,fontWeight:800,marginTop:10}]}>{new Date().getHours()<12?'Good Morning!':'Good Evening !'} {UserData.Name}</Text>
            <Text style={[styles.textColor,{marginTop:10}]}>Lets check yor today stats</Text>  
            <View style={{marginTop:20}}>
              {Data[0].population==0&&Data[1].population==0&&Data[2].population==0&&Data[3].population==0?<Text style={[styles.textColor,{marginTop:100,fontWeight:800,fontSize:25,marginBottom:40}]}>You haven't start your meal 🥺</Text>:<PieChart data={Data} width={screenWidth} height={220} chartConfig={chartConfig} accessor={"population"} backgroundColor={"transparent"} paddingLeft={"10"} center={[10, 5]} absolute/>}
            </View>
            <View style={styles.button}>
                <Button color='#85a4e4' title='Add Your Meal' onPress={()=>Navigation.navigate('Addmeal')}/>
            </View>
            <Text style={{color:'white',fontSize:20,fontWeight:800,marginTop:15,marginLeft:15}}>Your meals</Text>
            <View style={{height:220}}>
              <ScrollView>
                {TodayMealsData.map((value,index)=><Meal key={index} Type={value.Type} Food={value.Food}/>)}
                <Text style={{marginBottom:18}}></Text>
              </ScrollView>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Dasboard

const styles = StyleSheet.create({
    textColor:{
        color:'white',
        marginLeft:15
    },    button:{
        width:150,
        marginTop:40,
        marginLeft:120
      }
})