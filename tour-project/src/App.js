
import './App.scss';
import Header from './components/header/header';

import Cards from './components/cards/cards';

import data from "./data";




function App() {
  return (
    <div>
      <Header />
      <div className="topOfCard">
                <h1> POPULAR TOUR PLACES</h1>
      </div>
      <div className='cardDesign'>
        {data.map((item) => (
          <Cards key = {item.city} image = {item.image_link} city = {item.city} desc = {item.description} name = {item.city}/>
        ))}
      </div>
    </div>
  );
}

export default App;

/**
|--------------------------------------------------
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {About, Foryou, Services, Blog, Contact} from "./components/links/links";
|         <Router>
          <div>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/foryou" element={<Foryou />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes> 
          </div>
        </Router>
|--------------------------------------------------
*/
