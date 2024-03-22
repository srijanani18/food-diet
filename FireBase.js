// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDocs,collection,setDoc,doc, getFirestore} from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFVpziOif7BARI6kM-l0zncVx-n3ZXS8g",
  authDomain: "food-diet-b0b1b.firebaseapp.com",
  projectId: "food-diet-b0b1b",
  storageBucket: "food-diet-b0b1b.appspot.com",
  messagingSenderId: "246468687639",
  appId: "1:246468687639:web:8d05458a89cdd7d629a952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Your web app's Firebase configuration
var UserData={
    ID:"",
    Name:"",
    PhoneNumber:""
}
const db=getFirestore(app)

//Profile
async function getProfileData(db) {
    const ProfiledataCol = collection(db, 'Profile');
    const ProfileSnapshot = await getDocs(ProfiledataCol);
    const ProfileList = ProfileSnapshot.docs.map((doc) =>{
      return {...doc.data(),id:doc.id}
    });
    return ProfileList;
  }

async function setProfileData(db,id,data)
{
  console.log(data,id);
    await setDoc(doc(db, "Profile",id+""),{
      Name:data.Name,
      Age:data.Age,
      Password:data.Password,
      PhoneNumber:data.PhoneNumber,
      City:data.City
    });
}

//FoodData
async function getFoodDataData(db) {
    const FoodDatadataCol = collection(db, 'FoodData');
    const FoodDataSnapshot = await getDocs(FoodDatadataCol);
    const FoodDataList = FoodDataSnapshot.docs.map((doc) =>{
      return {...doc.data(),id:doc.id}
    });
    return FoodDataList;
  }

async function setFoodDataData(db,id,data)
{
  console.log(data,id);
    await setDoc(doc(db, "FoodData",id+""),{
      PhoneNumber:data.PhoneNumber,
      Year:data.Year,
      WeekNo:data.WeekNo,
      Month:data.Month,
      Date:data.Date,
      MealType:data.MealType,
      Meal:data.Meal,
      Grams:data.Grams
    });
}
// FoodNutritionData
async function getFoodNutritionData(db) {
    const FoodNutritionDatadataCol = collection(db, 'FoodNutritionData');
    const FoodNutritionDataSnapshot = await getDocs(FoodNutritionDatadataCol);
    const FoodNutritionDataList = FoodNutritionDataSnapshot.docs.map((doc) =>{
      return {...doc.data(),id:doc.id}
    });
    return FoodNutritionDataList;
  }
function getLastId(data)
{
  const id=[];
  for(i=0;i<data.length;i++)
  {
    id.push(Number(data[i].id))
  }
 id.sort((a,b)=>b-a)
 return id[0]
}
// const foodData={
//     Carbohydrates:'11.2',
//     Protien:'2.4',
//     Fat:'0.2',
//     Fiber:'0.9',
//     Type:'Orange'
// }

// async function setFoodNutData(db,id)
// {
//     await setDoc(doc(db, "FoodNutritionData",id+""),foodData);
//     console.log("completed",id)
// }
// setFoodNutData(db,5)
export {db,UserData,getFoodDataData,setFoodDataData,getProfileData,setProfileData,getLastId,getFoodNutritionData}