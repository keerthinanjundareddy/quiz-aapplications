import React, { useState } from 'react';
import './Quizsignups.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

function Quizuseresetpassword() {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[passwords,setPassword]=useState('')
  const[confirmPasswords,setConfirmPassword]=useState('')
  const[passerr,setPasserr]=useState('');
  const[confirmpasserr,setConfirmpasserr]=useState('');


  const navigate = useNavigate()


  const { userID } = useParams(); 

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordFocused(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePassword=(e)=>{
    setPassword(e.target.value)

  }
  const handleConfirmPassword=(e)=>{
    setConfirmPassword(e.target.value)

  }


  const handleResetPassword = (e) => {

    e.preventDefault();
    window.alert("hi");

   

    if(passwords.trim === '')
    {
      setPasserr("password caannot be empty")
      return;
    }

    if(confirmPasswords.trim === '')
    {
      setConfirmpasserr("password caannot be empty")
      return;
    }



 console.log("useparamasId",userID)


    // const ResetApi=`https://chat-bot-taupe-one.vercel.app/auth/reset-password/${userID}`

    // console.log("restapi",ResetApi)


    const RequestDetails={
      password:passwords,
      confirmPassword:confirmPasswords
    }


    console.log("resetdetails",RequestDetails)


    const headerObject={
      'Content-Type':'application/json',
      'Accept': '*/*',

    }
 

    axios.post(`https://chat-bot-taupe-one.vercel.app/auth/reset-password/${userID}`,RequestDetails,{headers:headerObject})
    .then((res)=>{
      console.log("forgotpasswordresult",res)
      navigate('/')

      

    })
    .catch((err)=>{
      console.log("err",err)

      if(err.response.data === '"password" is not allowed to be empty')
      {
        setPasserr("password cannot be Empty")
      }
      else{
        setPasserr('');

      }

      if(err.response.data === '"confirmPassword" must be [ref:password]')
      {
        setPasserr("password and confirm password are not matching")
        setConfirmpasserr("password and confirm password are not matching")
      }
      else{
        setPasserr('');
        setConfirmpasserr('');

      }



    })


  }

  return (
    <>
    <section>
      <div className='usersignupquiz-fullbox-container'>
        <div className='usersignupquiz-section '>
          <div className='quiz-login-text'>Reset Password</div>

          <div className="input-with-icon" style={{ marginTop: "20px" }}>
            <div>Password</div>
            <TextField
              // id="password"
              label={passwordFocused ? 'Password' : 'Password'}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              onChange={(e)=>handlePassword(e)}
              value={passwords}
              sx={{ width: "100%", marginTop: "10px", '& .MuiInputLabel-root': { fontSize: '14px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff sx={{ color: "grey" }} /> : <Visibility sx={{ color: "grey" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
              <div style={{textAlign:"left",color:"red",fontSize:"12px"}}>{passerr}</div>
          </div>

          <div className="input-with-icon" style={{ marginTop: "20px" }}>
            <div>Confirm Password</div>
            <TextField
              // id="confirmPassword"
              label={confirmPasswordFocused ? 'Confirm Password' : 'Confirm Password'}
              variant="outlined"
              value={confirmPasswords}
              onChange={(e)=>handleConfirmPassword(e)}
              type={showConfirmPassword ? 'text' : 'password'}
              onFocus={handleConfirmPasswordFocus}
              onBlur={handleConfirmPasswordBlur}
              sx={{ width: "100%", marginTop: "10px", '& .MuiInputLabel-root': { fontSize: '14px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff sx={{ color: "grey" }} /> : <Visibility sx={{ color: "grey" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
              <div style={{textAlign:"left",color:"red",fontSize:"12px"}}>{confirmpasserr}</div>
          </div>

          <div className='quizlogin'>
            <button className='quizlogin-btn' onClick={(e)=>handleResetPassword(e)}>Reset Password</button>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default Quizuseresetpassword;
