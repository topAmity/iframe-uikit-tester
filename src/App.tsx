// src/components/IframeTester.tsx
import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file
import logo from './sandbox.png'
const IframeTester: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiRegion, setApiRegion] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const [iframeSrc, setIframeSrc] = useState<string>(getIframeSrc(apiKey, apiRegion, userId, displayName));

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);

    setApiKey(queryParams.get("apiKey") as string);

    setApiRegion(queryParams.get("apiRegion") as string);


  }, []);
  function getIframeSrc(apiKey: string, apiRegion: string, userId: string, displayName: string): string {
    return `https://social-plus-web-ui-kit.netlify.app/?apiKey=${apiKey}&apiRegion=${apiRegion}&userId=${userId}&displayName=${displayName}`;
  }

  const handleSave = () => {
    setIframeSrc(getIframeSrc(apiKey, apiRegion, userId, displayName));
    setIsFormVisible(false)
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    const handleIframeMessage = (event: any) => {
      // Log any iframe message events globally
      console.log(event.data)
    };

    // Listen for messages from the iframe
    window.addEventListener('message', handleIframeMessage);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div className="container">
      {isFormVisible && (
        <>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="apiKey" className="label">API Key:</label>
              <input
                id="apiKey"
                type="text"
                className="input"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apiRegion" className="label">API Region:</label>
              <input
                id="apiRegion"
                type="text"
                className="input"
                value={apiRegion}
                onChange={(e) => setApiRegion(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userId" className="label">User ID:</label>
              <input
                id="userId"
                type="text"
                className="input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="displayName" className="label">Display Name:</label>
              <input
                id="displayName"
                type="text"
                className="input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <button disabled={!(apiKey && apiRegion && userId && displayName)} type="button" className="button" onClick={handleSave}>Log In</button>
          </form>
          <div style={{display:'flex', justifyContent:'center'}}>
          <img src={logo} width={310} height={300}/>
          </div>
     
          {/* <button type="button" className="toggle-button" onClick={toggleFormVisibility}>
            {isFormVisible ? 'Hide Form' : 'Show Form'}
          </button> */}
        </>
      )}
      {!isFormVisible && (
        <button
          type="button"
          className="toggle-button"
          onClick={toggleFormVisibility}
        >
          Log out
        </button>
      )}
      {!isFormVisible && apiKey && userId && apiRegion &&
        <iframe
          src={iframeSrc}
          className="iframe"
          title="Iframe Tester"
        />
      }

    </div>
  );
};

export default IframeTester;
