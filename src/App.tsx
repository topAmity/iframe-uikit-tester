// src/components/IframeTester.tsx
import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file with responsive styles

const IframeTester: React.FC = () => {
  // State declarations remain unchanged
  // Add CSS in App.css for responsive design

  useEffect(() => {
    // This effect is used to manage iframe and window resizing
    const handleResize = () => {
      // You might adjust other elements here as needed
    };

    // Call on initial load and setup event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Other useEffect for message handling remains unchanged

  return (
    <div className="container">
      {/* Toggling forms and showing forms are handled here */}
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
