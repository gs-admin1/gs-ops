import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [stage, setStage] = useState<number>(1); // 1 = email form, 2 = reset code form
    const [code, setCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSendCode = async () => {
        try {
            await Auth.forgotPassword(email);
            setStage(2); // Move to next stage to enter reset code and new password
            setError(null);
        } catch (err) {
            const error = err as Error;
            setError(error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            await Auth.forgotPasswordSubmit(email, code, newPassword);
            setError(null);
            alert('Your password has been reset successfully. You can now login with the new password.');
            // Optionally redirect the user to the login page or auto-login
        } catch (err) {
            const error = err as Error;
            setError(error.message);
        }
    };

    return (
        <div className="forgot-password-container">
            {stage === 1 ? (
                <>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button onClick={handleSendCode}>Send Reset Code</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter your reset code"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default ForgotPassword;
