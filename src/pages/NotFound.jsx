import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container container not-found-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="primary-button">Back to Home</Link>
    </div>
  );
};

export default NotFound;