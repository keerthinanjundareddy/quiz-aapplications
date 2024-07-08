import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';
import arrowback from '../Assets/arrow_back.png';
import { useNavigate } from 'react-router-dom';

function Quiz({ handleLogout }) {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showFinishPopup, setShowFinishPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = async () => {
    try {
      const response = await axios.get('http://lms.apprikart.com/generate');
      console.log("Fetched quiz questions:", response.data.result);
      if (response && response.data && response.data.result) {
        // Parse explanations and replace newline characters
        const parsedQuestions = response.data.result.map(question => ({
          ...question,
          explanation: question.explanation.replace(/\n\n/g, '<br>')
        }));
        setQuizQuestions(parsedQuestions);
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
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
      setShowFinishPopup(true);
    }
  };

  const handleFinishQuiz = () => {
    setShowFinishPopup(true);
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
            <div className='quiz-questions'>
            {currentQuestion && currentQuestion.question}
            </div>
            <div className='select-your-answer-div'>
              Select your answer
            </div>
            <div className='quiz-options'>
              {currentQuestion && currentQuestion.options.split('\n').map((option, index) => (
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
                <div className='explanation-answer-heading' dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}></div>
              </div>
            )}
            <div className='quiz-next-btn-section'>
              <div className='number-of-questions-div'>
                Question <span><b>{currentQuestionIndex + 1}</b></span> of {quizQuestions.length}
              </div>
              {currentQuestionIndex < quizQuestions.length - 1 ? (
                <div className='quiz-next-btn' onClick={handleNextQuestion}>Next<span><img src={arrowback} className='arrowback-icon' alt="arrow-icon" /></span></div>
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
