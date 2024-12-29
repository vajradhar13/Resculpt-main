// InitialLoader.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../utils/auth';

const InitialLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const authStatus = await checkAuth();

        if (authStatus.isAuthenticated) {
          navigate('/home'); // Redirect to home if authenticated
        } else {
          navigate('/signin'); // Redirect to signin if not authenticated
        }
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/signin'); // Redirect to signin if error occurs
      }
    };

    authenticate();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default InitialLoader;
