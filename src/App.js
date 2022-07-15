import './App.css';
import React,{useState} from 'react';

function App() {
  const [state,setState]=useState(false);
  let url="#Footer";
  return (
    <div className="Header">
        Header
        <a href={url}>LinkedIn handle</a>
    </div>
  );
}

export default App;
