import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const PublicRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);
  const router = useRouter();
  // Check if auth has values
  const isAuthenticated = Boolean(auth && Object.keys(auth).length === 0);

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    router.push('/login'); // Replace with your login page URL
    return null; // Render nothing while redirecting
  }
  // If authenticated, render the protected content
  return <>{children}</>;
};

export default PublicRoute;
