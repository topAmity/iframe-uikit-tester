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
  const [dimensions, setDimensions] = useState<{ width: string; height: string }>({ width: '100%', height: '80vh' });

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
    const handleResize = () => {
      setDimensions({ width: '100%', height: `${window.innerHeight * 0.8}px` });
    };

    // Set initial size
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleIframeMessage = (event: any) => {
      console.log(event.data);
    };

    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div className="container">
      {isFormVisible && (
        <>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            // Your form elements here
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
        style={{ width: dimensions.width, height: dimensions.height }}
        src={iframeSrc}
        className="iframe"
        title="Iframe Tester"
      />
    </div>
  );
};

export default IframeTester;
