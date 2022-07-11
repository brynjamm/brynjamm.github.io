import './Main.css';
import React, { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function MainContainer() {
  const { unityProvider, loadingProgression, isLoaded, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: '/build/Build.loader.js',
    dataUrl: '/build/Build.data',
    frameworkUrl: '/build/Build.framework.js',
    codeUrl: '/build/Build.wasm',
  });

  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    console.log("Toggle");
    setActive(!isActive);
  };

  return (
    <div className="Main-container">
        <div className="Unity-container">
            <div className='Unity-loading'>
              {!isLoaded && (
                <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
              )}
            </div>
            <Unity
            unityProvider={unityProvider}
            style={{ visibility: isLoaded ? "visible" : "hidden",
            height: "100%",
            width: "100%", 
            background: "blue",
          }} />
        </div>

        <div className={`Info-container ${!isActive ? "active" : ""}`}>
        
          <div className='Info_header'>
            name
          </div>

          <div className='Info_main'>
            text
          </div>

          <div className='Info_footer'>
            footer
          </div>
        </div>
      <button onClick={handleToggle}>Toggle class</button>
    </div>
  );
}

export default MainContainer;