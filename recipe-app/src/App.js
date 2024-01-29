
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
import DetailShareActions from "./components/pages/RecipePage/DetailPages/DetailShareActions";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
       <Route index element = {<Home />} />
       <Route path="about" element = {<About />} />
       <Route path="github" element = {<Github />} />
       <Route path="recipes" element = {<Recipes/>}
        loader = {RecipeLoader}
         />
       <Route
        path="recipes/:id"
        element={
          <RecipeDetail />}

        loader={recipeDetailLoader}
        errorElement={<Error />}
      />

       
    </ Route >
  )
)
function App() {
  return <RouterProvider router = {router}/>;

}

export default App;
