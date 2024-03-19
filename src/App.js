import React,{useState,useEffect} from 'react'
import Quiz from './components/Quiz'
import { Route, BrowserRouter as Router, Routes,Navigate} from 'react-router-dom';
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

  return (
    <>
<Router>
<div className="App">
  <Routes>
    <Route  path="/"  Component={Quizusersignin} setIsAuthenticated={ setIsAuthenticated } />
  
    <Route path="/signUp"   Component={Quizusersignup} />
    <Route path="/forgotPassword"   Component={Quizuserforgotpassword} setEmailVerified={setEmailVerified} />
    <Route path="/resetPassword/:userID"     Component={ Quizuseresetpassword } />

    <Route path="/lms"    Component={Quiz} />

    {/* {isAuthenticated ? (
  <Route path="/quiz"  Component={Quiz} />
    ):
    (
    <Route path="/"  Component={Quizusersignin} />
    )} */}



    


   </Routes>
   </div>

</Router>
      
    </>
  )
}

export default App

