import './App.css';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // State variables for managing authentication state, email, password, confirm password, and error messages
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle sign-up with Google using AWS Amplify
  const signUpWithGoogle = async () => {
    setAuthing(true);
    try {
      const response = await Auth.federatedSignIn({ provider: 'Google' });
      console.log(response); // You might want to navigate or do something else upon successful login
      navigate('/');
    } catch (error : any) {
      console.error(error);
      setError(error.message as string);
      setAuthing(false);
    }
  };

  // Function to handle sign-up with email and password
  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setAuthing(true);
    setError('');
    try {
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
          // other custom attributes can also be added here
        },
      });
      console.log(user);
      navigate('/');
    } catch (error : any) {
      console.error(error);
      setError(error.message as string);
      setAuthing(false);
    }
  };

  return (
    <div className='w-full h-screen flex'>
        <div className='w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center'>
        </div>
        <div className='w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center'>
            <div className='w-full flex flex-col max-w-[450px] mx-auto'>
                <div className='w-full flex flex-col mb-10 text-white'>
                    <h3 className='text-4xl font-bold mb-2'>Sign Up</h3>
                    <p className='text-lg mb-4'>Welcome! Please enter your information below to begin.</p>
                </div>
                <div className='w-full flex flex-col mb-6'>
                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Re-Enter Password'
                        className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <div className='text-red-500 mb-4'>{error}</div>}
                <div className='w-full flex flex-col mb-4'>
                    <button
                        onClick={signUpWithEmail}
                        disabled={authing}
                        className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                        Sign Up With Email and Password
                    </button>
                </div>
                <div className='w-full flex items-center justify-center relative py-4'>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                    <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                </div>
                <button
                    onClick={signUpWithGoogle}
                    disabled={authing}
                    className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                    {authing? "Signing Up..." : "Sign Up With Email and Password"}
                </button>
            </div>
            <div className='w-full flex items-center justify-center mt-10'>
                <p className='text-sm font-normal text-gray-400'>Already have an account? <span className='font-semibold text-white cursor-pointer underline'><a href='/login'>Log In</a></span></p>
            </div>
        </div>
    </div>
  );
}

export default Signup;
