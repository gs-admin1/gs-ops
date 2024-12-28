import React from 'react';

interface WebPageDisplayProps {
  url: string;
}

const WebPageDisplay: React.FC<WebPageDisplayProps> = ({ url }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={url}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Embedded Webpage"
      />
    </div>
  );
};

export default WebPageDisplay;