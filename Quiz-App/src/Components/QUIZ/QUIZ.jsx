import React, { useRef, useState } from "react";
import "./QUIZ.css";
import { data } from "../../assets/data";
const QUIZ = () => {
  let [index, setIndex] = useState(0);
  // question accodring to index
  let [question, setQuestion] = useState(data[index]);
  // lock answers
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [time, setTime] = useState(300);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_Arry = [option1, option2, option3, option4];
  const checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        // lock ki value true hogyi
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_Arry[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_Arry.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={option1}
                onClick={(e) => {
                  checkAnswer(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={option2}
                onClick={(e) => {
                  checkAnswer(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={option3}
                onClick={(e) => {
                  checkAnswer(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={option4}
                onClick={(e) => {
                  checkAnswer(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">
              {index + 1} of {data.length} questions
            </div>
          </>
        )}
        {result ? (
          <>
            <h2>
              You Scored {score} Out Of {data.length}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default QUIZ;
