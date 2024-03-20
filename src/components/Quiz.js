import React, { useState,useEffect } from 'react';
import './Quiz.css';
import arrowback from '../Assets/arrow_back.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Quiz({ handleLogout }) {

const navigate = useNavigate()


const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false); // New state for finish popup


  useEffect(() => {
    // Fetch quiz questions from API when the component mounts
    fetchQuizQuestions();
  }, []);

  const headerObject = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  };


  const fetchQuizQuestions = () => {
    axios.post('http://localhost:8000/generate', {
        content: "The Toyota Glanza is a compact hatchback that has garnered significant attention for its impressive features, catering to consumers seeking comfort, convenience, and advanced technology. One standout feature is its Total Effective Control Technology (TECT), which enhances occupant safety by incorporating crushable zones for impact absorption, uniformly dispersing impact energy, and utilizing high tensile and ultra-high tensile steel to ensure a lightweight yet strong body structure.Available in four variants - E, G, V, and the top-end V CVT (automatic) - the Glanza offers both manual transmission across all variants and an Intelligent Gear Shift (IGS) Automatic Manual Transmission (AMT) in the SG and V variants."
      },{ headers: headerObject})
      .then(response => {
        // Update quizQuestions state with the API response
       console.log("response of quiz data",response)
      })
      .catch(error => {
        console.log("error",error)
        console.error('Error fetching quiz questions:', error);
      });
  };
  
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    if (option === currentQuestion.correct_answer) {
      document.getElementById(option).classList.add("correct");
    } else {
      document.getElementById(option).classList.add("wrong");
      document.getElementById(currentQuestion.correct_answer).classList.add("correct");
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.classList.remove('correct', 'wrong');
    });

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setShowFinishPopup(true); // Show finish popup when reaching the last question
    }
  };

  const handleFinishQuiz = () => {
    setShowFinishPopup(true); // Hide finish popup
    // You can perform any other actions here, such as showing results or navigating away
  };

  const handleFinishQuiztwo= () =>{
    handleLogout();
    navigate('/')

  }

  return (
    <>
      <section>
        <div className='quiz-fullbox-container'>
          <div className='quiz-section'>
            <div className='quiz-heading'><b> question</b></div>
            <div className='quiz-questions'>
              <span>{currentQuestionIndex + 1}. </span>{currentQuestion.question}
            </div>
            <div className='select-your-answer-div'>
              Select your answer
            </div>
            <div className='quiz-options'>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  id={option}
                  className={`quiz-option`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            {showExplanation && (
              <div className='quiz-explanation-section'>
                <div className='explanation-text-heading'>
                  Explanation
                </div>
                <div className='explanation-answer-heading'>
                  {currentQuestion.explanation}
                </div>
              </div>
            )}
            <div className='quiz-next-btn-section'>
              <div className='number-of-questions-div'>
                question <span><b>{currentQuestionIndex + 1}</b></span> off {quizQuestions.length}
              </div>
              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <div className='quiz-next-btn' onClick={handleNextQuestion}>Next<span ><img src={arrowback} className='arrowback-icon' alt="arrow-icon" /></span></div>
              ) : (
                <div className='quiz-next-btn' onClick={handleFinishQuiz}>Finish</div>
              )}
            </div>
          </div>
        </div>
      </section>
      {showFinishPopup && (
        <div className="finish-popup">
          <div className="finish-popup-content">
            <h2>Congratulations!</h2>
            <p>You have successfully completed the test.</p>
            <button onClick={handleFinishQuiztwo}>Exit</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Quiz;
