import React,{useState} from 'react'
import './Quizsignups.css'
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Quizuserforgotpassword() {
    const [userNameFocused, setUserNameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const[email,setEmail]=useState("")
    const[emailErr,setEmailErr]=useState("")
    const [userId, setUserId] = useState(null); 


    const handleUserNameBlur = () => {
        setUserNameFocused(false);
      };
      const handleUserNameFocus = () => {
        setUserNameFocused(true);
      };

      const handleResetPassword = (e) =>{
        setEmail(e.target.value)
      }

      const navigate=useNavigate()


      const ForgotPasswordAi="https://hyundai-lms-theta.vercel.app/auth/forgot-password";

      const handleSubmit = (e) =>{
        e.preventDefault();

        let registerData= { email };

        console.log("registeredData",registerData)

        const headerObject={
          'Content-Type':'application/json',
          'Accept': '*/*',

        }
      
    axios.post(ForgotPasswordAi,registerData,{headers:headerObject},)
    .then((res)=>{
      console.log("forgot password result",res)
      setUserId(res.data.userID); 
      console.log("userid", res.data.userID); 
      navigate(`/resetPassword/${res.data.userID}`)
    
    })
    .catch((err)=>{
      console.log("err",err)

      if(err.response.data === '"email" is not allowed to be empty')
        {
          setEmailErr("Email cannot be Empty")
        }
        else if(err.response.data === '"email" must be a valid email'){
          setEmailErr("Enter valid email")
        }
        else if(err.response.data === "User with given email doesn't exist"){
          setEmailErr("User with given email doesn't exist")
        }
        else{
          setEmailErr('')

        }


    })


      }
    
      
  return (
    <>
     <div className='usersignupquiz-fullbox-container'>
        <div className='usersignupquiz-section '>

        <div className='quiz-login-text'>Forgot Password?</div>
        <div className='registered-email-text'>Enter your registered email id to reset the password</div>

        <div className="input-with-icon" style={{marginTop:"20px"}}>
              {/* <AccountCircleIcon style={{ marginRight: '5px', marginTop: '20px' }} /> Icon placed before text field */}
              <TextField
                id="username"
                label={userNameFocused ? 'Email id' : 'Email id'}
                variant="outlined"
                value={email}
                onChange={(e)=>handleResetPassword(e)}
                onFocus={handleUserNameFocus}
                onBlur={handleUserNameBlur}
                sx={{ width: '100%', '& .MuiInputLabel-root': { fontSize: '14px',fontWeight:"500",color:"grey"  } ,'& .MuiInputBase-input': { // Styling for the input value
                  fontSize: '14px' // Adjust the font size here
                } }}
              
              />
               <div style={{textAlign:"left",color:"red",fontSize:"12px"}}>{emailErr}</div>
            </div>

            <div className='quizlogin'>
            <button className='quizlogin-btn' onClick={(e)=>handleSubmit(e)}>Submit</button>
          </div>
       



            </div>
        </div>
      
    </>
  )
}

export default Quizuserforgotpassword
