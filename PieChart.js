import { getFoodDataData,db, getFoodNutritionData } from "./FireBase";
export const getDayData=async()=>
{
    const responseFoodData=await getFoodDataData(db)
    const responseNutitionData=await getFoodNutritionData(db)
    console.log(responseFoodData)
    console.log(responseNutitionData)
    const date=new Date()
    var Nutrition={
        Protien:0,
        Carbohydrates:0,
        Fat:0,
        Fiber:0
    }
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
    for(i=0;i<responseFoodData.length;i++)
    {
        
        if(responseFoodData[i].Date==20&&responseFoodData[i].Month==date.getMonth()+1&&responseFoodData[i].Year==date.getFullYear())
        {
           
           for(j=0;j<responseNutitionData.length;j++)
           {
            if(responseNutitionData[j].Type==responseFoodData[i].Meal)
            {
               for(k=0;k<TodayMeals.length;k++)
               {
                if(TodayMeals[k].Type==responseFoodData[i].MealType)
                {
                    TodayMeals[k].Food.push(responseFoodData[i].Meal)
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
    return {
        Nutrition,TodayMeals
    }
}