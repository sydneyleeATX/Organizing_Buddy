/**
 * @file KeepQuiz.js
 * @description Component for a quiz to determine if an item should be kept, donated, or thrown away
 * 
 * This component provides a series of questions to help users make informed decisions about their belongings.
 * It uses a quiz format to evaluate items based on their usage, condition, and sentimental value.
 * The results are used to guide users in their decision-making process.
 */

import React, { useState } from "react";
// Questions for the KeepQuiz component
const quizData = [
  {
    question: "When was the last time you used this item?",
    options: [
      { text: "Within the last 3 months", scores: { keep: 2, donate: 0, trash: 0 } },
      { text: "6 months - 1 year ago", scores: { keep: 0, donate: 1, trash: 0 } },
      { text: "More than 1 year ago", scores: { keep: 0, donate: 1, trash: 1 } }
    ]
  },
  {
    question: "Is this item still functional and in good condition?",
    options: [
      { text: "Yes, perfectly.", scores: { keep: 2, donate: 2, trash: 0 } },
      { text: "Yes, but with minor wear.", scores: { keep: 1, donate: 1, trash: 0 } },
      { text: "No, it's broken or heavily damaged.", scores: { keep: 0, donate: 0, trash: 2 } }
    ]
  },
  {
    question: "Does this item bring you joy or serve a clear purpose in your life?",
    options: [
      { text: "Yes, absolutely! (Joy or Essential)", scores: { keep: 2, donate: 0, trash: 0 } },
      { text: "Maybe, it's sentimental but rarely used.", scores: { keep: 0, donate: 1, trash: 0 } },
      { text: "Not really, it just takes up space.", scores: { keep: 0, donate: 0, trash: 2 } }
    ]
  },
  {
    question: "Could someone else genuinely benefit from this item?",
    options: [
      { text: "No, it's very specific to my needs.", scores: { keep: 1, donate: 0, trash: 0 } },
      { text: "Yes, it's in good shape and useful for others.", scores: { keep: 1, donate: 1, trash: 0 } },
      { text: "Unlikely, it's broken or worn out.", scores: { keep: 0, donate: 0, trash: 2 } }
    ]
  },
  {
    question: "Is this item easy or inexpensive to replace if you needed it again?",
    options: [
      { text: "No, it's rare or expensive to replace.", scores: { keep: 1, donate: 0, trash: 0 } },
      { text: "Yes, fairly easy and inexpensive.", scores: { keep: 0, donate: 1, trash: 1 } },
      { text: "I don't think I'd need to replace it.", scores: { keep: 0, donate: 1, trash: 1 } }
    ]
  }
];

// Finds the max of the three categories and returns the corresponding result
const getResult = (scores) => {
  const max = Math.max(scores.keep, scores.donate, scores.trash);
  if (max === scores.keep) return "Keep it!";
  if (max === scores.donate) return "Donate it!";
  return "Trash it!";
};

const KeepQuiz = ({ open, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({ keep: 0, donate: 0, trash: 0 });

  if (!open) return null;

  // Handles the selection of an option
  const handleOption = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    // Updates the scores based on the selected option
    setScores(prev => ({
      keep: prev.keep + option.scores.keep,
      donate: prev.donate + option.scores.donate,
      trash: prev.trash + option.scores.trash
    }));
    // If there are more questions, move to the next one
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  // Handles the restart of the quiz by resetting all states
  const handleRestart = () => {
    // back to first question
    setCurrent(0);
    // reset answers
    setAnswers([]);
    // hide result
    setShowResult(false);
    // reset scores
    setScores({ keep: 0, donate: 0, trash: 0 });
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeStyle} onClick={onClose}>&times;</button>
        <h2>Should I Keep This?</h2>
        {!showResult ? (
          <>
            <div style={{ marginBottom: 24 }}>
                {/* Question number and total number of questions */}
              <strong>Question {current + 1} of {quizData.length}</strong>
              {/* Question text */}
              <p>{quizData[current].question}</p>
            </div>

            <div>
                {/* Options */}
              {quizData[current].options.map((option, idx) => (
                <button
                  key={idx}
                  style={optionBtnStyle}
                  onClick={() => handleOption(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h3>Result: {getResult(scores)}</h3>
            {/* Display scores in all categories */}
            <div style={{ margin: '1rem 0' }}>
              <span style={{ color: '#4e9d66', fontWeight: 600 }}>Keep: {scores.keep} </span>
              <span style={{ color: '#e6b800', fontWeight: 600 }}>Donate: {scores.donate} </span>
              <span style={{ color: '#e05a5a', fontWeight: 600 }}>Trash: {scores.trash}</span>
            </div>
            {/* Retake quiz and close buttons */}
            <button style={optionBtnStyle} onClick={handleRestart}>Retake Quiz</button>
            <button style={{ ...optionBtnStyle, marginLeft: 12 }} onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  zIndex: 3000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: 'white',
  borderRadius: 12,
  padding: '2rem 2.2rem 1.5rem 2.2rem',
  minWidth: 320,
  maxWidth: '90vw',
  boxShadow: '0 6px 32px rgba(0,0,0,0.18)',
  position: 'relative',
  textAlign: 'left',
};

const closeStyle = {
  position: 'absolute',
  top: 10,
  right: 16,
  background: '#fff',
  color: '#333',
  border: '1px solid #ddd',
  borderRadius: 18,
  fontSize: 26,
  width: 36,
  height: 36,
  cursor: 'pointer',
  zIndex: 3100,
  lineHeight: 1,
  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
};

const optionBtnStyle = {
  display: 'block',
  width: '100%',
  margin: '0.5rem 0',
  padding: '0.8rem 1.2rem',
  background: '#b2e0eb',
  color: '#333',
  border: 'none',
  borderRadius: 8,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

export default KeepQuiz;
