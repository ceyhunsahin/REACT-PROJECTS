import React from 'react'
import {
    getAuth,
  } from "firebase/auth";
import { app, provider } from "../Firebase/firebase.utils";
import {redirect , useNavigate} from "react-router-dom";
export async function  loader() {

    // verify if user is signed in
    const auth = getAuth(app);
    console.log("recipe auth", auth)
    const user = auth.currentUser;
    console.log('recipeadduser',user)
    if (!user) {
      return redirect("/login", { replace: true });
    } else {
        return user;
    }
  }


const RecipeAdd = () => {
    // add  router loader
    

  return (
    <div>RecipeAdd</div>
  )
}

export default RecipeAdd