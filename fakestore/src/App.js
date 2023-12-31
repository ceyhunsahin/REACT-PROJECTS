import Card from "./components/Card/Card";
import Header from "./components/header/header";
import { useState } from'react';
import './App.css';
import DataContext from "./components/DataContext";


function App() {
  const [urun, setUrun] = useState([]);

  return (
  
      <DataContext.Provider value={{ urun, setUrun }}>
          <Header />
     
          <Card />


      
      </DataContext.Provider>
    
  );
}

export default App;
