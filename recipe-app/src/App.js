
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
import Recipes from './components/pages/Recipes';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
       <Route index element = {<Home />} />
       <Route path="/about" element = {<About />} />
       <Route path="/github" element = {<Github />} />
       <Route path="/Recipes" element = {<Recipes />} />
       
    </ Route >
  )
)
function App() {
  return <RouterProvider router = {router}/>;

}

export default App;
