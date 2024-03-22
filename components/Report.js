import { StyleSheet, Text, View,Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PieChart } from 'react-native-chart-kit'
import { Dropdown } from 'react-native-element-dropdown'
import { Dimensions } from "react-native";
import { getFoodDataData,getFoodNutritionData,db } from '../FireBase'
import { UserData } from '../FireBase'
const screenWidth = Dimensions.get("window").width;
const data = [
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
const Report = () => {
    const [Type,setType]=useState('Day')
    const [Data,setData]=useState([
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
  const getWeekData=async()=>
  {
    const responseFoodData=await getFoodDataData(db)
    const responseNutitionData=await getFoodNutritionData(db)
    const date=new Date()
    var Nutrition={
        Protien:0,
        Carbohydrates:0,
        Fat:0,
        Fiber:0
    }
    for(i=0;i<responseFoodData.length;i++)
    {
      if(responseFoodData[i].PhoneNumber==UserData.PhoneNumber&&responseFoodData[i].WeekNo==getDateWeek()&&responseFoodData[i].Year==date.getFullYear())
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
  const getYearData=async()=>
  {
    const responseFoodData=await getFoodDataData(db)
    const responseNutitionData=await getFoodNutritionData(db)
    const date=new Date()
    var Nutrition={
        Protien:0,
        Carbohydrates:0,
        Fat:0,
        Fiber:0
    }
    for(i=0;i<responseFoodData.length;i++)
    {
      if(responseFoodData[i].PhoneNumber==UserData.PhoneNumber&&responseFoodData[i].Year==date.getFullYear())
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
  const loadData=()=>
  {
    if(Type=="Day")
    {
      getDayData()
    }else{
      if(Type=="Weekly")
      {
        getWeekData()
      }else if(Type=="Yearly")
    {
      getYearData()
    }
    }
  }
    useEffect(()=>
    {
      loadData()
    },[Type])
  return (
    <SafeAreaView>
        <View style={{backgroundColor:'black',marginTop:30}}> 
            <Text style={[styles.textColor,{fontWeight:'900',fontSize:30,marginLeft:20,color:'#85a4e4',marginTop:10}]}>DineData</Text>
            <Text style={[styles.textColor,{fontWeight:'300',marginLeft:20}]}>Health meets data</Text>
            <Text style={[styles.textColor,{fontWeight:'800',marginLeft:150,fontSize:18,marginTop:100}]}>Diet Report</Text>
            <Dropdown style={styles.dropdown} 
            data={[{label:'Day',value:'Day'},{label:'Weekly',value:'Weekly'},{label:'Yearly',value:'Yearly'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            labelField="label"
            valueField="value" 
            placeholder='Select Type'
            value={Type}
            onChange={item=>
            {
                setType(item.value)
            }}
            />
            <View style={{marginTop:50}}>
            {Data[0].population==0&&Data[1].population==0&&Data[2].population==0&&Data[3].population==0?<Text style={[styles.textColor,{marginTop:100,fontWeight:800,fontSize:25,marginBottom:80,marginLeft:110}]}>No Data Found 🥺</Text>:<PieChart data={Data} width={screenWidth} height={220} chartConfig={chartConfig} accessor={"population"} backgroundColor={"transparent"} paddingLeft={"10"} center={[10, 5]} absolute/>}
            </View>
            <View style={styles.button}>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Report

const styles = StyleSheet.create({
    textColor:{
        color:'white',
        marginLeft:15
    },  button:{
        width:150,
        marginTop:40,
        marginLeft:120,
        marginBottom:160
      },dropdown: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        padding:10,
        width:300,
        marginLeft:60,
        marginTop:20
      },  
      placeholderStyle: {
        color:'white',
        fontSize:15,
        fontWeight:400
      },
      selectedTextStyle: {
        fontSize: 15,
        color:'white'
      }
})