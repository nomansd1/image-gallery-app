import React from 'react';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/utils/getUser';
const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const data = getUserInfo();

    React.useEffect(() => {
        // Check if the user is not authenticated (data is an empty array), redirect to login.
        if (Array.isArray(data) && data.length === 0) {
            router.push('/login'); // Redirect to the login page.
        }
    }, [data]); // Add data to the dependency array to trigger the effect when data changes.

    return <>{children}</>;
};
export default ProtectedRoute;
