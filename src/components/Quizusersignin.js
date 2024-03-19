import React, { useState,useEffect } from 'react';
import './Quizsignups.css';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the icon component
import LockIcon from '@mui/icons-material/Lock'; // Import the lock icon component
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quizusersignin({ setIsAuthenticated}) {
  const [userNameFocused, setUserNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const[username,setUserName]=useState('');
  const[password,setPassword]=useState('');
  const[userNameErr,setUserNameErr]=useState('');
  const[passwordErr,setPasswordErr]=useState('');

const navigate = useNavigate()

// useEffect(() => {
  // Function to make the screen full-screen on component mount
//   const makeFullScreen = () => {
//       if (document.documentElement.requestFullscreen) {
//           document.documentElement.requestFullscreen();
//       } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
//           document.documentElement.mozRequestFullScreen();
//       } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
//           document.documentElement.webkitRequestFullscreen();
//       } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
//           document.documentElement.msRequestFullscreen();
//       }
//   };

//   makeFullScreen(); // Call the function to make full-screen
// }, []); // Run only on component mount

  const handleUserNameFocus = () => {
    setUserNameFocused(true);
  };

  const handleUserNameBlur = () => {
    setUserNameFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSignup = () =>{
  
    navigate('/signUp')
  }

  const handleLoginUsername = (e) => { 
    setUserName(e.target.value)

  }

  const handleLoginPassword = (e) => {
    setPassword(e.target.value)

  }

  const  handleForgotPssword = () =>{
    navigate("/forgotPassword")
  }

  const handleSignIn = () =>{


    if (username.trim() === '') {
     setUserNameErr("Email Id cannot be empty");
      return; // Stop form submission if name is empty
  }
  
   


    const QuixSignInApi="https://hyundai-lms-theta.vercel.app/auth/login"

    const details = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: null,
      client_secret: null,
    };

   const headerObject={
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }

    const formBody = Object.keys(details)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
    .join('&');

    console.log("formBody",formBody)


    axios.post(QuixSignInApi,formBody,{headers:headerObject})
    .then((res)=>{
      console.log("result",res)
      const accessToken = res.data.access_token;
      // console.log("accesstoken",accessToken)
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      navigate("/lms")

  

    })
    .catch((err) => {
      console.log("err", err);
      if (err.response && err.response.data) {
        console.log("new err", err.response.data);
    
       
       

        if(err.response.data==="User with given email doesn't exist"){
          setUserNameErr("User with given email doesn't exist ");
           }
         else if (err.response.data === '"username" must be a valid email') {
            setUserNameErr("enter valid email id");
          } else {
            setUserNameErr('');
          }
  
  

        if  (err.response.data ==='"password" is not allowed to be empty') {
          setPasswordErr("password is not allowed to be empty");
        } 
        else if(err.response.data === "Invalid password" ){
          setPasswordErr("Invalid password");
        }
        else {
          setPasswordErr('');
        }

      } 
      
      else {
        console.error("Error response or data is undefined");
        // Handle this scenario as per your application logic
      }
    });
  }    

  return (
    <>
    <section>
      <div className='usersignupquiz-fullbox-container'>
        <div className='usersignupquiz-section '>

          <div className='quiz-login-text'>LOGIN</div>

          <div className="userquizsignuptextinputfield">
            <div className="input-with-icon">
              <AccountCircleIcon style={{ marginRight: '5px', marginTop: '20px' }} /> {/* Icon placed before text field */}
              <TextField
             
                label={userNameFocused ? 'Email id' : 'Email id'}
                variant="standard"
                value={username}
                onChange={(e)=>handleLoginUsername(e)}
                onFocus={handleUserNameFocus}
                onBlur={handleUserNameBlur}
                sx={{ width: '80%', '& .MuiInputLabel-root': { fontSize: '14px' ,fontWeight:"500",color:"grey" }, '& .MuiInputBase-input': { // Styling for the input value
                  fontSize: '14px' // Adjust the font size here
                } }}
              
              />
                <div style={{textAlign:"left",marginLeft:"50px",color:"red",fontSize:"12px"}}>{userNameErr}</div>
            </div>
          
          </div>

          <div className="userquizsignuptextpasswordfield">
            <div className="input-with-icon">
              <LockIcon style={{ marginRight: '5px', marginTop: '20px' }} /> {/* Icon placed before password field */}
              <TextField
             
                label={passwordFocused ? 'Password' : 'Password'}
                variant="standard"
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                onFocus={handlePasswordFocus}
                value={password}
                onChange={(e)=>handleLoginPassword(e)}
                onBlur={handlePasswordBlur}
                sx={{ width: '80%', '& .MuiInputLabel-root': { fontSize: '14px' ,fontWeight:"500",color:"grey" },'& .MuiInputBase-input': { // Styling for the input value
                  fontSize: '14px' // Adjust the font size here
                } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff  sx={{color:"grey"}} /> : <Visibility sx={{color:"grey"}}/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div style={{textAlign:"left",marginLeft:"50px",color:"red",fontSize:"12px"}}>{passwordErr}</div>
          </div>

          <div className='userQuizfogotpassword' onClick={handleForgotPssword}>forgot password?</div>
          <div className='quizlogin'>
            <button className='quizlogin-btn' onClick={handleSignIn}>Login</button>
          </div>
         
          <div className='userquizdonthaveaccount'>Dont have an account?</div>
          <div className='quizsignup'>
            <button className='quizsignup-btn' onClick={handleSignup}>Sign Up</button>
          </div>

        </div>
      </div>
      </section>
    </>
  );
}

export default Quizusersignin;

