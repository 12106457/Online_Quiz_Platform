import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const TestArea = () => {
  const [mcqs, setMcqs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  
  const [testCompleted, setTestCompleted] = useState(false);
  const [index, setIndex] = useState(0);

  const state = useSelector((state) => state);
  const dispatch=useDispatch();
  const navigate = useNavigate();
 

  useEffect(() => {
    fetch("http://localhost:3000/mcqs", {
      method: "GET",
      headers: {
        Authorization: state.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.mcqs) {
          setMcqs(data.mcqs);
        } else {
          alert("No questions found.");
        }
      })
      .catch((err) => {
        alert("Something went wrong. Please try again.");
      });
  }, []);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleIndex = (newIndex) => {
    if (newIndex >= 0 && newIndex < mcqs.length) {
      setIndex(newIndex);
    }
  };

  function handleSubmit() {
    alert("Do you want to Submit the Test");
    

    let data = {
      email: state.email,
      name: state.name,
      
      selectedAnswers:selectedAnswers
    };


    fetch("http://localhost:3000/save-score", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res_data) => {
        if(res_data){
          dispatch({type:"score",payload:{score:res_data.data.score}});
          navigate('/complete')
        }else{
          alert("some went wrong while submitting");
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  }

  return (
    <div style={{ height: "100vh" }}>
      <Navbar type={"Test Interface"} />
      <div className="mcq-container d-flex justify-content-center">
        <div>
          <button
            className="btn btn-primary"
            onClick={() => handleIndex(index - 1)}
            disabled={index === 0}
          >
            Prev
          </button>
        </div>

        <div className="mcq-inner-container text-center mt-4 w-75">
          <div className="text-center mt-1">
            Question {index + 1}/{mcqs.length}
          </div>

          {mcqs[index] ? (
            <>
              <div className="text-center fs-3 text-primary mt-3 mb-5">
                {mcqs[index].question}
              </div>
              <div>
                <ul className="list-unstyled d-flex flex-column align-items-center">
                  {mcqs[index].options.map((option, i) => (
                    <li
                      key={i}
                      className={`card p-2 w-50 mt-3 ${selectedAnswers[index] === option ? 'bg-info' : ''}`}
                      style={{
                        padding: "5px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOptionChange(index, option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div>No question available</div>
          )}
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => handleIndex(index + 1)}
            disabled={index === mcqs.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button
          onClick={handleSubmit}
          className="btn btn-danger w-75 mb-3 text-submit-button"
        >
          Submit
        </button>
      </div>
      <div>
        {!testCompleted && <Webcam width={"140px"} className="webcam" />}
      </div>

      
    </div>
  );
};

export default TestArea;
