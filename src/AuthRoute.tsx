import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {
    children: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check user authentication state with Amplify
        Auth.currentAuthenticatedUser()
            .then((user : any) => {
                // User is authenticated
                setLoading(false);
            })
            .catch(() => {
                // User not authenticated
                console.error('Unauthorized access attempted.');
                setLoading(false);
                navigate('/login');
            });

        // Cleanup function not required as Amplify handles subscriptions internally
    }, [navigate]);

    if (loading) {
        return (
            <div aria-busy="true" aria-label="Loading, please wait." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
                <style>{`
                    .spinner {
                        border: 4px solid rgba(0,0,0,0.1);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        border-left-color: #09f;
                        animation: spin 1s infinite linear;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return <div>{children}</div>;
}

export default AuthRoute;
