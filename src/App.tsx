// src/components/IframeTester.tsx
import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file

const IframeTester: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('b0efe90c3bdda2304d628918520c1688845889e4bc363d2c');
  const [apiRegion, setApiRegion] = useState<string>('staging');
  const [userId, setUserId] = useState<string>('YeenUlta');
  const [displayName, setDisplayName] = useState<string>('YeenUlta');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const [iframeSrc, setIframeSrc] = useState<string>(getIframeSrc(apiKey, apiRegion, userId, displayName));

  function getIframeSrc(apiKey: string, apiRegion: string, userId: string, displayName: string): string {
    return `https://ulta-social-ui-kit.netlify.app/?apiKey=${apiKey}&apiRegion=${apiRegion}&userId=${userId}&displayName=${displayName}`;
  }

  const handleSave = () => {
    setIframeSrc(getIframeSrc(apiKey, apiRegion, userId, displayName));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    const handleIframeMessage = (event:any) => {
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
            <button type="button" className="button" onClick={handleSave}>Save</button>
          </form>
          <button type="button" className="toggle-button" onClick={toggleFormVisibility}>
            {isFormVisible ? 'Hide Form' : 'Show Form'}
          </button>
        </>
      )}
      {!isFormVisible && (
        <button type="button" className="toggle-button" onClick={toggleFormVisibility}>
          Show Form
        </button>
      )}
      <iframe
        style={{ width: '100%', height: '80vh' }}
        src={iframeSrc}
        className="iframe"
        title="Iframe Tester"
      />
    </div>
  );
};

export default IframeTester;
