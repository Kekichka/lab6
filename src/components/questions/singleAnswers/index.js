import { useRef, useState, useEffect } from 'react';
import './style.css';
import * as uuid from 'uuid';

const SingleAnswerComponent = (props) => {
  let selectedAnswerIndex = null;
  const radioClick = (index) => {
    selectedAnswerIndex = index;
    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
  };

  const correctRef = useRef();
  const wrongRef = useRef();
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);

  const checkOnClick = () => {
    if (selectedAnswerIndex === props.correctAnswer) {
      correctRef.current.classList.add('selected');
      wrongRef.current.classList.remove('selected');
    } else {
      wrongRef.current.classList.add('selected');
      correctRef.current.classList.remove('selected');
      
      setIncorrectAttempts((prevAttempts) => prevAttempts + 1);
    }
  };

  const showCorrectAnswer = () => {
    
    correctRef.current.classList.add('selected');
    wrongRef.current.classList.remove('selected');
    setShowCorrect(true);
  };

  useEffect(() => {
    
    if (showCorrect) {
      const correctAnswerIndex = props.correctAnswer;
      const correctAnswerInput = document.getElementById(
        `answer-${correctAnswerIndex}`
      );
      if (correctAnswerInput) {
        correctAnswerInput.checked = true;
      }
    }
  }, [showCorrect, props.correctAnswer]);

  const qId = uuid.v1();

  return (
    <div className='question single-answer'>
      <div>
        <h3>{props.question}</h3>
      </div>
      <div className='answers'>
        {props.answers.map((answer, i) => {
          const id = uuid.v1();
          return (
            <div key={id}>
              <input
                id={`answer-${i}`}
                type='radio'
                name={`group-${qId}`}
                onClick={() => radioClick(i)}
                disabled={showCorrect} 
              />
              <label htmlFor={`answer-${i}`}>{answer}</label>
            </div>
          );
        })}
      </div>
      <div className='check'>
        <div className='button' onClick={checkOnClick}>
          Check My Answer
          <div ref={correctRef} className='correct'>
            Correct
          </div>
          <div ref={wrongRef} className='wrong'>
            Wrong
          </div>
        </div>
        
        {incorrectAttempts >= 3 && (
          <button onClick={showCorrectAnswer} className='show-correct-answer'>
            Show Me Correct Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleAnswerComponent;