
import axios from 'axios';


const app_key = "e5ec8b040abb1082912cac0704088928"
const app_id = "9d24c0c3"

const url =  "https://api.edamam.com/api/recipes/v2"
const detailUri = "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_"


export const getRecipes = async (query , mealType) => {
    console.log("mealTypefull", mealType)
    console.log("queryfull", query)
    const queryParams = [];


    if (query !== 'null') {
      queryParams.push(`q=${query}`);
    }
  
    if (Array.isArray(mealType) && mealType.length > 0) {
        mealType.forEach(type => {
          queryParams.push(`mealType=${type}`);
        });
      }

    console.log("bu queryPArams onemli", queryParams)

  
    const fullUrl = `${url}?type=public&app_id=${app_id}&app_key=${app_key}${queryParams.length > 0 ? `&${queryParams.join('&')}` : ''}`;
    try {
        const response = await axios.get(fullUrl);
        return response.data;

    } catch (error) {
        throw new Error(error.message);
    }
    
  };

export const getRecipeDetails = async (id) => {


    const fullUrl = `${url}/by-uri?type=public&uri=${detailUri}${id}&app_id=${app_id}&app_key=${app_key}`
    console.log('buradaki id nedir', fullUrl)                
    
    const response = await axios.get(fullUrl)
    return response.data.hits
}


export function extractParamsFromString(inputString) {
    const params = {};

    console.log("inputString", inputString)
  
    // Parametreleri "&" ile ayır
    const paramArray = inputString.split("&");
  
    // Her bir parametreyi incele
    paramArray.forEach((param) => {
      // "=" ile ayır ve sadece '=' den sonraki kısmı al
      const [key, value] = param.split("=");
  
      // Eğer key zaten mevcutsa, value'yu bir dizi içine ekle
      if (params[key]) {
        params[key] = Array.isArray(params[key])
          ? [...params[key], value]
          : [params[key], value];
      } else {
        params[key] = value;
      }
    });
  
    return params;
  }

  export function extractParamsFromStringAsList(inputString) {

    const paramArrayList = [];

    console.log("inputString", inputString)
  
    // Parametreleri "&" ile ayır
    const paramArray = inputString.search.split("&");
  
    // Her bir parametreyi incele
    paramArray.forEach((param) => {
      // "=" ile ayır ve sadece '=' den sonraki kısmı al
      const [key, value] = param.split("=");
      paramArrayList.push(value);

    });

    return paramArrayList;


    
  }

  export function getParameterByName( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  export function handleResetPassword (auth, actionCode, continueUrl, lang) {
    return auth.sendPasswordResetEmail(actionCode, continueUrl, lang);
  }

  export function handleRecoverEmail(auth, actionCode, lang) {
    return auth.sendEmailVerification(actionCode, lang);
  }

  export function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    return auth.confirmPasswordReset(actionCode, continueUrl, lang);
  }