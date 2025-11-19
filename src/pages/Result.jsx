// Result page - display game results
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import { getPlayers, getPlayerScore, saveMatchHistory, removeFromStorage } from '../utils/storage';

function Result() {
  const [players, setPlayers] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const gamePlayers = getPlayers();
    if (!gamePlayers) {
      navigate('/game-setup');
      return;
    }

    setPlayers(gamePlayers);
    
    // Get scores
    const player1Score = getPlayerScore(gamePlayers.player1) || 0;
    const player2Score = getPlayerScore(gamePlayers.player2) || 0;
    
    setScore1(player1Score);
    setScore2(player2Score);

    // Save match to history
    const match = {
      player1: gamePlayers.player1,
      player2: gamePlayers.player2,
      score1: player1Score,
      score2: player2Score,
      date: new Date().toISOString()
    };
    saveMatchHistory(match);

    // Clean up game data
    removeFromStorage('quiz_current_player');
    removeFromStorage('quiz_questions');
  }, [navigate]);

  if (!players) {
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

  const winner = score1 > score2 ? players.player1 : score2 > score1 ? players.player2 : null;
  const isTie = score1 === score2;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body text-center p-5">
                <h1 className="card-title mb-4">Game Results</h1>

                {/* Player 1 Score */}
                <div className={`card mb-3 ${winner === players.player1 ? 'border-success border-3' : ''}`}>
                  <div className="card-body">
                    <h3>{players.player1}</h3>
                    <h2 className={winner === players.player1 ? 'text-success' : ''}>
                      {score1} points
                    </h2>
                    {winner === players.player1 && (
                      <span className="badge bg-success">Winner!</span>
                    )}
                  </div>
                </div>

                {/* VS */}
                <h4 className="my-3">VS</h4>

                {/* Player 2 Score */}
                <div className={`card mb-4 ${winner === players.player2 ? 'border-success border-3' : ''}`}>
                  <div className="card-body">
                    <h3>{players.player2}</h3>
                    <h2 className={winner === players.player2 ? 'text-success' : ''}>
                      {score2} points
                    </h2>
                    {winner === players.player2 && (
                      <span className="badge bg-success">Winner!</span>
                    )}
                  </div>
                </div>

                {/* Tie message */}
                {isTie && (
                  <div className="alert alert-info">
                    <h5>It's a Tie!</h5>
                    <p>Both players scored {score1} points!</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="d-grid gap-2 col-md-6 mx-auto mt-4">
                  <Link to="/game-setup" className="btn btn-primary btn-lg">
                    Play Again
                  </Link>
                  <Link to="/home" className="btn btn-outline-secondary">
                    Back to Home
                  </Link>
                  <Link to="/history" className="btn btn-outline-info">
                    View History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;

