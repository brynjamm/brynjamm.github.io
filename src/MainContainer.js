import './Main.css';
import React, { useEffect, useState } from "react";
import { usePapaParse } from 'react-papaparse';
import Papa from 'papaparse';
import { Unity, useUnityContext } from "react-unity-webgl";
import materialFile from './testing.csv';

const urls = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsDd1I-StRJHIMy7OivDlTo05PTRdPJMeRo0SdIMBG9zXmAX9H22fdfcznhGJ72H61sNLEQ1uKWARw/pub?output=csv";

var nameer = "hello";

function mytestFunc() {
  alert("function test in called");
}

function MainContainer(props) {
  const { unityProvider, loadingProgression, isLoaded, SendMessage} = useUnityContext({
    loaderUrl: '/build/Build.loader.js',
    dataUrl: '/build/Build.data',
    frameworkUrl: '/build/Build.framework.js',
    codeUrl: '/build/Build.wasm',
  });

  const [isActive, setActive] = useState("false");

  const [materialList, setData] = useState({});
  const { readRemoteFile } = usePapaParse();
  
  useEffect(() => {
    async function parseFile() {

      readRemoteFile(urls, {
        download: true,
        header: true,
        complete: (result) => {
          console.log("Parsing Complete: ", result);
          setData(result);
        },
        error: (error) => {
          console.log("Parsing Error: ", error);
        },
      });
    };
    parseFile();
  }, [readRemoteFile]);

  const handleToggle = () => {
    console.log("Toggle");
    if (isActive){
      console.log(materialList.data[0].name);
      nameer = (materialList.data[0].name);
    }
    //setActive(!isActive); 
    window.useUnityContext.SendMessage("WorldController", "CloseInfo");
  };

  const OpenInfo = (ID) => {
    setActive(false); 
    console.log(ID);
    nameer = (materialList.data[ID].name)
  };

  const CloseInfo = () => {
    setActive(true); 
  };

  window.TestingTest = function () {
    //window.alert("Working Hello!!");
    handleToggle();
  };

  window.OpenWindow = function (ID) {
    //window.alert("Working Opening!!");
    OpenInfo(ID);
  };

  window.CloseWindow = function () {
    //window.alert("Working Closing!!");
    CloseInfo();
  };


  return (
    <div className="Main-container">
        <div className='Unity-container'>
          {!isLoaded && (
            <div className='Unity-loading'>
              <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
              
            </div>
          )}
            <Unity
            unityProvider={unityProvider}
            style={{
            height: "100%",
            width: "100%", 
            background: "blue",
          }} />

          <div className={`Info-container ${!isActive ? "active" : ""}`}>
            <div className='Info_header'>
              <h2>Name: {nameer}</h2>
            </div>

            <div className='Info_main'>
              text
            </div>

            <div className='Info_footer'>
              footer
            </div>
          </div>

        </div>

      <button onClick={handleToggle}>Toggle class</button>
    </div>
  );
}

export default MainContainer;