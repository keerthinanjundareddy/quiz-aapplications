import React, { useState } from 'react';
import './Quiz.css';

function Quiz() {
  const quizQuestions = [
    {
        "question": "What is the capital of France?",
        "options": ["London", "Paris", "Berlin", "Rome"],
        "correct_answer": "Paris",
        "explanation": "Paris is the capital city of France, known for its iconic landmarks such as the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral."
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        "correct_answer": "Leonardo da Vinci",
        "explanation": "The Mona Lisa is a famous portrait painted by the Italian Renaissance artist Leonardo da Vinci. It is one of the most recognized and valuable artworks in the world."
    },
    {
        "question": "What is the tallest mountain in the world?",
        "options": ["K2", "Mount Kilimanjaro", "Mount Everest", "Denali"],
        "correct_answer": "Mount Everest",
        "explanation": "Mount Everest, located in the Himalayas on the border between Nepal and China, is the tallest mountain in the world, standing at a height of 8,848.86 meters (29,031.7 feet) above sea level."
    },
    {
        "question": "Who wrote the play 'Romeo and Juliet'?",
        "options": ["William Wordsworth", "William Shakespeare", "Charles Dickens", "Jane Austen"],
        "correct_answer": "William Shakespeare",
        "explanation": "Romeo and Juliet is a tragedy written by English playwright William Shakespeare. It tells the story of two young star-crossed lovers whose deaths ultimately reconcile their feuding families."
    },
    {
        "question": "What is the chemical symbol for water?",
        "options": ["CO2", "H2O", "NaCl", "O2"],
        "correct_answer": "H2O",
        "explanation": "The chemical symbol for water is H2O, indicating that each water molecule consists of two hydrogen atoms bonded to one oxygen atom."
    },
    {
        "question": "Who was the first person to step on the moon?",
        "options": ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
        "correct_answer": "Neil Armstrong",
        "explanation": "Neil Armstrong, an American astronaut, was the first person to set foot on the moon on July 20, 1969, during the Apollo 11 mission."
    },
    {
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Cell membrane", "Mitochondria", "Endoplasmic reticulum"],
        "correct_answer": "Mitochondria",
        "explanation": "Mitochondria are often referred to as the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), which is used as a source of energy."
    },
    {
        "question": "Who wrote the 'Harry Potter' book series?",
        "options": ["Stephen King", "J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien"],
        "correct_answer": "J.K. Rowling",
        "explanation": "The Harry Potter book series was written by British author J.K. Rowling. It follows the life and adventures of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley."
    },
    {
        "question": "What is the capital of Japan?",
        "options": ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        "correct_answer": "Tokyo",
        "explanation": "Tokyo is the capital city of Japan, known for its bustling metropolis, cutting-edge technology, and rich cultural heritage."
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": ["Mars", "Venus", "Saturn", "Jupiter"],
        "correct_answer": "Jupiter",
        "explanation": "Jupiter is the largest planet in our solar system, with a diameter of about 143,000 kilometers (89,000 miles). It is a gas giant composed mostly of hydrogen and helium."
    }
]

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  
    if (option === currentQuestion.correct_answer) {
      // Set border color to green for correct option
      document.getElementById(option).classList.add("correct");
    } else {
      // Set border color to red for incorrect option
      document.getElementById(option).classList.add("wrong");
      // Set border color to green for correct option
      document.getElementById(currentQuestion.correct_answer).classList.add("correct");
      setShowExplanation(true);
    }
  };
  
  
  
  const handleNextQuestion = () => {
    // Reset border colors for all options
    setShowExplanation(false);
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.classList.remove('correct', 'wrong');
    });
  
    // Move to the next question
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOption(null); // Reset selected option when moving to the next question
  };


  return (
    <>
      <div className='quiz-fullbox-container'>
        <div className='quiz-section'>
          <div className='quiz-heading'><b>Quiz Section</b></div>

          <div className='quiz-questions'>
            {currentQuestion.question}
          </div>
          <div className='quiz-options'>
          {currentQuestion.options.map((option, index) => (
  <div
    key={index}
    id={option} // Add unique ID for each option
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
            <div>
              {currentQuestion.explanation}
            </div>
          </div>
          )}

          <div className='quiz-next-btn-section'>
            {currentQuestionIndex < quizQuestions.length - 1 &&
              <button className='quiz-next-btn' onClick={handleNextQuestion}>Next</button>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
