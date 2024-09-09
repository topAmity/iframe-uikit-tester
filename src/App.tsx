// src/components/IframeTester.tsx
import React, { useEffect, useState, useRef } from 'react';
import './IframeTester.css';

const IframeTester: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

  const adjustIframeHeight = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (iframeDocument) {
        const height = iframeDocument.body.scrollHeight;
        iframeRef.current.style.height = `${height}px`;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', (event: any) => console.log(event.data));

    return () => {
      window.removeEventListener('message', (event: any) => console.log(event.data));
    };
  }, []);

  return (
    <div className="container">
      {isFormVisible && (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* Form content remains unchanged */}
        </form>
      )}
      <button type="button" className="toggle-button" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </button>
      <iframe
        ref={iframeRef}
        onLoad={adjustIframeHeight}  // Set to adjust height on load
        src={iframeSrc}
        className="iframe"
        title="Iframe Tester"
        style={{ width: '100%' }}  // Remove height style to be set dynamically
      />
    </div>
  );
};

export default IframeTester;
