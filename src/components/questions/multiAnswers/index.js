import { useRef, useState, useEffect } from 'react';
import './style.css';
import * as uuid from 'uuid';

const isArrayEqual = (selected, correct) => {
  if (selected.length !== correct.length) {
    return false;
  }
  return correct.every((item) => selected.includes(item));
};

const MultiAnswerComponent = (props) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState([]);
  const correctRef = useRef();
  const wrongRef = useRef();
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);

  const checkboxClick = (index) => {
    setSelectedAnswerIndex((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((e) => e !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
  };

  const checkOnClick = () => {
    if (isArrayEqual(selectedAnswerIndex, props.correctAnswer)) {
      correctRef.current.classList.add('selected');
      wrongRef.current.classList.remove('selected');
    } else {
      wrongRef.current.classList.add('selected');
      correctRef.current.classList.remove('selected');
      setIncorrectAttempts((prevAttempts) => prevAttempts + 1);
    }
  };

  const showCorrectAnswer = () => {
    setShowCorrect(true);
  };

  useEffect(() => {
   
    setSelectedAnswerIndex([]);
  }, [props.correctAnswer]);

  useEffect(() => {
    
    if (showCorrect) {
      const correctAnswerIndexes = props.correctAnswer;
      setSelectedAnswerIndex(correctAnswerIndexes);
      correctRef.current.classList.add('selected');
      wrongRef.current.classList.remove('selected');
    }
  }, [showCorrect, props.correctAnswer]);

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
                type='checkbox'
                checked={selectedAnswerIndex.includes(i)}
                onChange={() => checkboxClick(i)}
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
    
        {incorrectAttempts >= 3 && !showCorrect && (
          <button onClick={showCorrectAnswer} className='show-correct-answer'>
            Show Me Correct Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiAnswerComponent;
