import React,{useState,useEffect} from 'react'
import Quiz from './components/Quiz'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Quizusersignup from './components/Quizusersignup';
import Quizusersignin from './components/Quizusersignin';
import Quizuserforgotpassword from './components/Quizuserforgotpassword'
import Quizuseresetpassword from './components/Quizuseresetpassword'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false); 

  useEffect(() => {
    // Checking  authentication status over here, checking by looking at a token in local storage
    const userToken = localStorage.getItem('accessToken');
    if (userToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    //  accessToken is stored in localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Display an alert
    // window.alert("Logout successful");

    // Remove the accessToken from localStorage
    localStorage.removeItem('accessToken');

    // Set isAuthenticated to false 
    setIsAuthenticated(false);


    setEmailVerified(false);

   
  };

  return (
    <>
<Router>
<div className="App">
  <Routes>
    <Route  path="/"  element={<Quizusersignin  setIsAuthenticated={ setIsAuthenticated }/>}  />
  
    <Route path="/signUp"   element={<Quizusersignup />}  />
    <Route path="/forgotPassword"   element={<Quizuserforgotpassword setEmailVerified={setEmailVerified} />} />
    <Route path="/resetPassword/:userID"     element={emailVerified ? <Quizuseresetpassword /> : <Navigate to="/forgotpassword" />}/>

    {/* <Route path="/lms"    Component={Quiz} /> */}

    {isAuthenticated ? (
  <Route path="/lms"  element={<Quiz handleLogout={handleLogout} />} />
    ):
    (
    <Route path="/lms"  element={<Navigate to="/" />} />
    )}



    


   </Routes>
   </div>

</Router>
      
    </>
  )
}

export default App

