
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Github from './components/pages/Github';
import Recipes, {loader as RecipeLoader} from './components/pages/RecipePage/Recipes';
import RecipeDetail , {loader as recipeDetailLoader} from "./components/pages/RecipePage/RecipeDetail";
import Error from './components/pages/RecipePage/ErrorRecipe';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
       <Route index element = {<Home />} />
       <Route path="/About" element = {<About />} />
       <Route path="/Github" element = {<Github />} />
       <Route path="/Recipes" element = {<Recipes/>}
        loader = {RecipeLoader}
        errorElement = {<Error/>} />
      <Route path="Recipes/:id" element = {<RecipeDetail/>}
       loader={recipeDetailLoader}
       errorElement = {<Error/>}
        />


       
    </ Route >
  )
)
function App() {
  return <RouterProvider router = {router}/>;

}

export default App;
