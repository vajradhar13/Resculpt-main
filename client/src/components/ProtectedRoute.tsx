import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode}) => {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated === null) {
      return <div>Loading...</div>; 
    }
  
    if (!isAuthenticated) {
      return null; 
    }
  
    return <>{children}</>;
};

export default ProtectedRoute;