
import axios from 'axios';


const app_key = "e5ec8b040abb1082912cac0704088928"
const app_id = "9d24c0c3"

const url =  "https://api.edamam.com/api/recipes/v2"
const detailUri = "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_"


export const getRecipes = async (query='null', mealType='null') => {
    const fullUrl = query || mealType 
                    ?
                    `${url}?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}` 
                    : 
                    `${url}?type=public&&q=${query}app_id=${app_id}&app_key=${app_key}&mealType=${mealType}`
                    ?
                    `${url}?type=public&app_id=${app_id}&app_key=${app_key}&mealType=${mealType}`
                    :
                    `${url}?type=public&app_id=${app_id}&app_key=${app_key}`

    
    const response = await axios.get(fullUrl)

    

    return response.data
}
export const getRecipeDetails = async (id) => {


    const fullUrl = `${url}/by-uri?type=public&uri=${detailUri}${id}&app_id=${app_id}&app_key=${app_key}`
    console.log('buradaki id nedir', fullUrl)                
    
    const response = await axios.get(fullUrl)
    return response.data.hits
}