import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Amplify from 'aws-amplify';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import AuthRoute from './AuthRoute';
import ForgotPassword from './ForgotPassword';

import './index.css';

const amplifyConfig = {
  apiKey: "my_api_key",
  authDomain: "my_auth_domain",
  projectId: "my_project_id",
  storageBucket: "my_storage_bucket",
  messagingSenderId: "my_messaging_sender_id",
  appId: "my_app_id"
};

// Configure Amplify
Amplify.configure(amplifyConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute><App/></AuthRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </StrictMode>
);
