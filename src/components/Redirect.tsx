import React from 'react';

interface RedirectPageProps {
  url: string;
}

const RedirectPage: React.FC<RedirectPageProps> = ({ url }) => {
  React.useEffect(() => {
    window.location.href = url;
  }, [url]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;