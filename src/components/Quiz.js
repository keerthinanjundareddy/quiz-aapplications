import React, { useState, useEffect } from 'react';
import './Quiz.css';
import arrowback from '../Assets/arrow_back.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

function Quiz({ handleLogout }) {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);

  useEffect(() => {
    // Fetch quiz questions from API when the component mounts
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = () => {
    const headerObject = {
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
  

    axios.post('http://localhost:8000/generate', {
        content: "The Toyota Glanza is a compact hatchback that has garnered significant attention for its impressive features, catering to consumers seeking comfort, convenience, and advanced technology. One standout feature is its Total Effective Control Technology (TECT), which enhances occupant safety by incorporating crushable zones for impact absorption, uniformly dispersing impact energy, and utilizing high tensile and ultra-high tensile steel to ensure a lightweight yet strong body structure.Available in four variants - E, G, V, and the top-end V CVT (automatic) - the Glanza offers both manual transmission across all variants and an Intelligent Gear Shift (IGS) Automatic Manual Transmission (AMT) in the SG and V variants."
      },{ headers: headerObject })
      .then((response) => {
        console.log("LMS API Response:", response);
        // Update quizQuestions state with the API response
        setQuizQuestions(response.data.result.map(question => ({
          ...question,
          options: question.options.split('\n').map(option => option.trim())
        })));
      })
      .catch(error => {
        console.error('LMS catch block error', error);
      });
  };
  

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    const currentQuestion = quizQuestions[currentQuestionIndex];
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

  const handleFinishQuiztwo = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <>
      <section>
        <div className='quiz-fullbox-container'>
          <div className='quiz-section'>
            <div className='quiz-heading'><b>Question</b></div>
            {quizQuestions.length > 0 && (
              <div className='quiz-questions'>
                <span>{currentQuestionIndex + 1}. </span>{quizQuestions[currentQuestionIndex].question}
              </div>
            )}
            <div className='select-your-answer-div'>Select your answer</div>
            <div className='quiz-options'>
              {quizQuestions.length > 0 && (
                quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <div
                    key={index}
                    id={option}
                    className={`quiz-option`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))
              )}
            </div>
            {showExplanation && (
              <div className='quiz-explanation-section'>
                <div className='explanation-text-heading'>Explanation</div>
                <div className='explanation-answer-heading'>
                  {quizQuestions[currentQuestionIndex].explanation}
                </div>
              </div>
            )}
            <div className='quiz-next-btn-section'>
              <div className='number-of-questions-div'>
                question <span><b>{currentQuestionIndex + 1}</b></span> of {quizQuestions.length}
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
