import React from 'react';
import { HashLoader

} from 'react-spinners';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-content pb-3">
        <HashLoader

 color="#6EE7B7" size={60} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
