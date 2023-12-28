
import './App.css';
import Header from './components/header/header';

import Cards from './components/cards/cards';

import data from "./data";

function App() {
  return (
    <div>
      <Header />
      <Cards data = {data} />

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
