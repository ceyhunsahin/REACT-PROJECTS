import React from 'react';

const DataContext = React.createContext({
    urun: [],
    setUrun: () => {}
  });

export default DataContext;