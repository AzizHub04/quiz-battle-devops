// Play page - quiz game interface
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import QuestionCard from '../components/Quiz/QuestionCard';
import Timer from '../components/Quiz/Timer';
import { getShuffledQuestions } from '../utils/questions';
import { getPlayers, savePlayerScore, saveToStorage, getFromStorage, removeFromStorage } from '../utils/storage';

function Play() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isFinished, setIsFinished] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [players, setPlayers] = useState(null);
  const navigate = useNavigate();

  // Initialize game
  useEffect(() => {
    const gamePlayers = getPlayers();
    if (!gamePlayers) {
      navigate('/game-setup');
      return;
    }

    setPlayers(gamePlayers);

    // Check if this is Player 2's turn
    const savedPlayer = getFromStorage('quiz_current_player');
    if (savedPlayer === 2) {
      setCurrentPlayer(2);
      // Reset all game state for Player 2
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setTimeLeft(10);
      setIsFinished(false);
      
      // Load Player 1's questions to use the same set
      const savedQuestions = getFromStorage('quiz_questions');
      if (savedQuestions) {
        setQuestions(savedQuestions);
      } else {
        // If no saved questions, generate new ones
        const newQuestions = getShuffledQuestions();
        setQuestions(newQuestions);
        saveToStorage('quiz_questions', newQuestions);
      }
      // Reset Player 2's score to 0
      setScore(0);
      removeFromStorage(`quiz_score_${gamePlayers.player2}`);
    } else {
      // Player 1's turn - generate new questions
      setCurrentPlayer(1);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setScore(0);
      setTimeLeft(10);
      setIsFinished(false);
      
      const newQuestions = getShuffledQuestions();
      setQuestions(newQuestions);
      saveToStorage('quiz_questions', newQuestions);
      saveToStorage('quiz_current_player', 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  // Handle next question or finish
  const handleNextQuestion = () => {
    if (isFinished) return; // Prevent multiple calls
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if answer is correct using functional update to avoid stale closure
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 10);
    }

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(10);
    } else {
      // Quiz finished
      finishQuiz();
    }
  };

  // Timer effect
  useEffect(() => {
    if (isFinished || questions.length === 0) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        if (!isFinished) {
          setTimeLeft((prev) => prev - 1);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Time's up - move to next question (only if not finished)
      if (!isFinished) {
        handleNextQuestion();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isFinished, questions.length]);

  // Finish quiz
  const finishQuiz = () => {
    if (isFinished) return; // Prevent multiple calls
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Calculate final score - check if last answer was correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Calculate final score
    setScore((prevScore) => {
      const finalScore = isCorrect ? prevScore + 10 : prevScore;
      
      // Save score immediately
      const playerName = currentPlayer === 1 ? players.player1 : players.player2;
      savePlayerScore(playerName, finalScore);
      
      return finalScore;
    });
    
    setIsFinished(true);

    // Navigate after a short delay
    setTimeout(() => {
      if (currentPlayer === 1) {
        // Player 1 finished - switch to Player 2
        saveToStorage('quiz_current_player', 2);
        // Reset Player 2's score if it exists from a previous game
        removeFromStorage(`quiz_score_${players.player2}`);
        // Navigate to transition page
        navigate('/player-transition', { replace: true });
      } else {
        // Both players finished - go to results
        navigate('/result', { replace: true });
      }
    }, 1500);
  };

  // If no questions loaded yet
  if (questions.length === 0 || !players) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const playerName = currentPlayer === 1 ? players.player1 : players.player2;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Player info */}
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">
                  {playerName}'s Turn (Player {currentPlayer})
                </h4>
                <p className="mb-0">Score: {score} points</p>
                <p className="mb-0">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="progress mt-2" style={{ height: '5px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Timer */}
            <Timer seconds={timeLeft} onTimeUp={handleNextQuestion} />

            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
            />

            {/* Next button */}
            {selectedAnswer !== null && !isFinished && (
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? 'Next Question'
                    : 'Finish Quiz'}
                </button>
              </div>
            )}

            {/* Finished message */}
            {isFinished && (
              <div className="alert alert-success text-center mt-3" role="alert">
                <h5>Quiz Completed!</h5>
                <p>Final Score: {score} points</p>
                <p>Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Play;

