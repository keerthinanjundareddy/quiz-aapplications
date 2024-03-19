import React, { useState ,useEffect} from 'react';
import './Quizsignups.css';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email'; // Import the icon component
import LockIcon from '@mui/icons-material/Lock'; // Import the lock icon component
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Quizusersignup() {
  const [userNameFocused, setUserNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const[username,setUserName]=useState('');
  const[userTitle,setUserTitle]=useState('');
  const[password,setPassword]=useState('');

  const[nameErr,setnameErr]=useState('');
  const[TitleErr,setTitleErr]=useState('');
  const[passwordErr,setPassworrdErr]=useState('');
  

    
  const grant_type='password';
  const client_id=null;
  const client_secret=null;

  const navigate=useNavigate()


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



  const handleUserTitle = (e) => {
    const value = e.target.value;
    setUserTitle(value);
  

  };
  
  const handleUserName = (e) => {
    const value = e.target.value;
    setUserName(value);
  
    
  };
  
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  
 
  };

  const handleLogin=()=>{
    navigate('/')

  }
  



  const handleSignup = (e) =>{
    e.preventDefault();
  
   
    const signUpData={username,userTitle,password,grant_type,client_id,client_secret}

    const signUpApi="https://hyundai-lms-theta.vercel.app/auth/register";

    const headerObject = {
      'Content-Type':'application/json',
      "Accept":"*/*",
      // "Access-Control-Allow-Origin": "*",
    }


    

    console.log("signupDataa",signUpData);


    if (userTitle.trim() === '') {
      setTitleErr("Name cannot be empty");
      return; // Stop form submission if name is empty
  }

  if(username.trim===''){
    setUserName("email Id cannot be empty")
    return;
  }
  if(password.trim===''){
    setPassworrdErr("password cannot be empty")
    return;

  }

    axios.post(signUpApi,signUpData,{headers:headerObject})
    .then((res)=>{
      console.log("QuizsignupApi",res)

      setTitleErr("");
      setPassworrdErr("");
      setnameErr("");
      navigate('/');

    })
    .catch((err)=>{
      console.log("signUpErrors",err.response.data)

      
       if (err.response.data.message==="Name is not correct!")
      {
        setTitleErr("Name is not correct!")
       }
      else{
        setTitleErr("");
      }
       if(err.response.data.message==="Email is invalid!"){
        setnameErr("enter valid email id")
      }
      else if(err.response.data.message==="user already exist!"){
        setnameErr("user already exists! ")
      }
      else{
        setnameErr("")

      }  
       if (err.response.data.message==="Password should be strong, please use one number, one upper case, one lower case, and one special character, and characters should be between 8 to 15 only!"){
           setPassworrdErr("Password should be strong, please use one number, one upper case, one lower case, and one special character, and characters should be between 8 to 15 only!")
      }
      else{
        setPassworrdErr("")
      }
     

    });



  

    
  }

  return (
    <>
     <section>
      <div className='usersignupquiz-fullbox-container'>
        <div className='usersignupquiz-section '>

          <div className='quiz-login-text'>SIGN UP</div>


          <div className="userquizsignuptextinputfield">
            <div className="input-with-icon">
              <AccountCircleIcon style={{ marginRight: '5px', marginTop: '20px' }} /> {/* Icon placed before text field */}
              <TextField
             
                type="text" 
               value={userTitle}
               onChange={(e)=>handleUserTitle(e)}
                label={userNameFocused ? 'Name' : 'Name'}
                variant="standard"
                onFocus={handleUserNameFocus}
                onBlur={handleUserNameBlur}
                sx={{ width: '80%', '& .MuiInputLabel-root': { fontSize: '14px' ,fontWeight:"500",color:"grey"},'& .MuiInputBase-input': { // Styling for the input value
                  fontSize: '14px' // Adjust the font size here
                } }}
              
              />
               <div style={{textAlign:"left",marginLeft:"50px",color:"red",fontSize:"12px"}}>{TitleErr}</div>
            </div>
          </div>


          <div className="userquizsignuptextinputfield">
            <div className="input-with-icon">
            <EmailIcon style={{ marginRight: '5px', marginTop: '20px',}} /> {/* Email icon */}
              <TextField
               
                label={userNameFocused ? 'Email id' : 'Email id'}
                type="email" 
                value={username}
                onChange={(e)=>handleUserName(e)}
                variant="standard"
                onFocus={handleUserNameFocus}
                onBlur={handleUserNameBlur}
                sx={{ width: '80%', '& .MuiInputLabel-root': { fontSize: '14px' ,fontWeight:"500",color:"grey" },'& .MuiInputBase-input': { // Styling for the input value
                  fontSize: '14px' // Adjust the font size here
                } }}
              
              />
              <div style={{textAlign:"left",marginLeft:"50px",color:"red",fontSize:"12px"}}>{nameErr}</div>
            </div>
          </div>

          <div className="userquizsignuptextpasswordfield">
            <div className="input-with-icon">
              <LockIcon style={{ marginRight: '5px', marginTop: '20px' }} /> {/* Icon placed before password field */}
              <TextField
              
                label={passwordFocused ? 'Password' : 'Password'}
                variant="standard"
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e)=>handlePassword(e)}// Toggle password visibility
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
                sx={{width:"80%",'& .MuiInputLabel-root': { fontSize: '14px' ,fontWeight:"500",color:"grey" } ,'& .MuiInputBase-input': { // Styling for the input value
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
                 <div style={{textAlign:"left",marginLeft:"50px",color:"red",fontSize:"12px"}}>{passwordErr}</div>
            </div>
          </div>

          {/* <div className='userQuizfogotpassword'>forgot password?</div> */}
          <div className='quizlogin'>
            <button className='quizlogin-btn' onClick={(e)=>handleSignup(e)} >Sign Up</button>
          </div>
         
          <div className='userquizdonthaveaccount'>Already have an Account? </div>
          <div className='quizsignup'>
            <button className='quizsignup-btn' onClick={handleLogin} >Login</button>
          </div>

        </div>
      </div>
      </section>
    </>
  );
}

export default Quizusersignup;
