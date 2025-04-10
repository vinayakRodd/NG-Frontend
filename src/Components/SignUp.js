// import React from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const navigate = useNavigate();  // Initialize useNavigate hook

//   // Success handler after login
//   const handleLoginSuccess = (response) => {
//     console.log('Google Login Successful:', response);

//     const id_token = response.credential;

    

//     // Send the Google token to the backend for verification and JWT generation
//     fetch('http://localhost:5000/api/auth/google', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token: id_token }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('User authenticated:', data);

//         // Ensure the backend response includes a token
//         if (data.token) {
//           // Store the JWT token in localStorage for session persistence
//           localStorage.setItem('authToken', data.token);

//           // Optionally, you can store user details in localStorage or state for easier access
//           localStorage.setItem('userEmail', data.userEmail);
//           localStorage.setItem('userName', data.name);
          
//           // Redirect the user to the home page
//           console.log('Navigating to /home');
//           navigate('/home');
//         } else {
//           console.error('No token returned from backend');
//         }
//       })
//       .catch((error) => {
//         console.error('Error during authentication:', error);
//       });
//   };

//   // Error handler for login failure
//   const handleLoginError = (error) => {
//     console.error('Login Failed:', error);
//   };

//   return (
//     <GoogleOAuthProvider clientId="671517750511-mmdjce8r01fgqmfbiqevoq7fcr46df4p.apps.googleusercontent.com">
//       <div className="signUp">
//         <h2>Sign Up with Google</h2>
//         <GoogleLogin
//           onSuccess={handleLoginSuccess}
//           onError={handleLoginError}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Success handler after login
  const handleLoginSuccess = (response) => {
    console.log('Google Login Successful:', response);
  
    const id_token = response.credential;
  
    // Decode the ID token to extract user information
    const decodedToken = JSON.parse(atob(id_token.split('.')[1]));
    console.log('Decoded Token:', decodedToken);
  
    // Validate email domain
    const email = decodedToken.email;
    const allowedDomain = '@bmsce.ac.in';
    const emailPattern = /^[a-z]+\.[a-z]+\d{2}@bmsce\.ac\.in$/;
 // Pattern for "name_branch_year@bmsce.ac.in"
  
    if (email.endsWith(allowedDomain) && emailPattern.test(email)) {
      console.log('Valid BMSCE email:', email);
  
      // Send the Google token to the backend for verification and JWT generation
      fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User authenticated:', data);
  
          // Ensure the backend response includes a token
          if (data.token) {
            // Store the JWT token in localStorage for session persistence
            localStorage.setItem('authToken', data.token);

            // Redirect the user to the home page
            console.log('Navigating to /home');
            navigate('/home');
  
          } else {
            console.error('No token returned from backend');
          }
        })
        .catch((error) => {
          console.error('Error during authentication:', error);
        });
    } else {
      // Show error if email domain or format is invalid
      console.error('Invalid email domain or format:', email);
      alert('Please use a valid BMSCE email address to log in.');
    }
  };
  
  // Error handler for login failure
  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
  };



  return (
    <GoogleOAuthProvider clientId="671517750511-mmdjce8r01fgqmfbiqevoq7fcr46df4p.apps.googleusercontent.com">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            width: '400px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>

      
        
            
            <span
              style={{
                flex: 1,
                height: '1px',
                backgroundColor: '#ccc',
                position: 'relative',
                top: '10px',
              }}
            ></span>
         

          {/* Google Sign-In */}
          <div>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUp;

