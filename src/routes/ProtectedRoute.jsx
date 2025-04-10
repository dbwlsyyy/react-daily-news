import React from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>
                <h4 style={{ marginTop: '5px', marginLeft: '10px' }}>
                    Loading...
                </h4>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" />;
    }

    return children ? children : 'ERROR - 홈 화면이 없습니다.';
};

export default ProtectedRoute;
