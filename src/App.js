import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  const [isButtonNext, setButtonNext] = useState(false);
  const [questionNum, setQuestionNum] = useState(0);
  const [question, setQuestion] = useState("");
  const [revealAnsVisible, setRevealAnsVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [matchingAnswer, setMatchingAnswer] = useState("");
  const [resetVisible, setResetVisible] = useState(false);

  const handleButtonNext = async () => {
    setButtonNext(true);
    setRevealAnsVisible(true);
    setAnswerVisible(false);
    setMatchingAnswer("");
    setQuestion("");
    const newQuestion = await getQuestion();
    setQuestion(newQuestion);
    increaseQuestionNum();
    setResetVisible(true);
  };

  const handleRevealAnswer = () => {
    setRevealAnsVisible(false);
    setAnswerVisible(true);
  };

  const handleReset = () => {
    setButtonNext(false);
    setResetVisible(false);
    setQuestionNum(0);
    setAnswerVisible(false);
  };

  const increaseQuestionNum = () => {
    setQuestionNum(questionNum + 1);
  };

  async function getQuestion() {
    const endpoint = "http://jservice.io/api/random";
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      setMatchingAnswer(json[0].answer);
      return json[0].question;
    } catch (e) {
      console.log(e);
      alert("Failed to get question");
    }
  }

  function GenerateTrivia() {
    const text =
      questionNum > 0
        ? "Next trivia question!"
        : "Let's start with a trivia question!";
    return (
      <button
        type="button"
        className="btn btn-primary"
        id="triviaButton"
        onClick={handleButtonNext}
      >
        {text}
      </button>
    );
  }

  function QuestionCard() {
    return (
      <div class = "question-card-container">
        <div className="card mx-auto" id = "question-card" style={{ width: "18rem" }}>
          <div className="card-body" >
            <h5 className="card-title" > Question {questionNum} </h5>
            <p className="card-text"> {question} </p>
          </div>
        </div>
      </div>
    );
  }

  function RevealAnswer() {
    if (revealAnsVisible) {
      return (
        <div className = "revealAnswerContainer">
          <button
          type="button"
          className="btn btn-primary"
          id="bottomButton"
          onClick={handleRevealAnswer}
        >
          {" "}
          Reveal Answer{" "}
        </button>
        </div> 
      );
    } else {
      return null;
    }
  }

  function AnswerCard() {
    if (answerVisible) {
      return (
        <>
          <div className="card mx-auto"id ="answer-card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title"> Answer </h5>
              <p
                className="card-text"
                dangerouslySetInnerHTML={{ __html: matchingAnswer }}
              ></p>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  function Reset() {
    if (resetVisible) {
      return (
        <button
          type="button"
          className="btn btn-danger"
          id="resetButton"
          onClick={handleReset}
        >
          {" "}
          Reset{" "}
        </button>
      );
    } else {
      return null;
    }
  }

  return (
    <div className = "big-container">
      <Header />
      <div className="button-container">
        <GenerateTrivia />
        <Reset />
      </div>
      {isButtonNext && <QuestionCard />}
      {isButtonNext && <RevealAnswer />}
      {<AnswerCard />}
      <Footer />
    </div>
  );
}

export default App;
