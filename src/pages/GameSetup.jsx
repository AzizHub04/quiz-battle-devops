// Game Setup page - enter player names
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import { savePlayers, removeFromStorage } from '../utils/storage';

function GameSetup() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!player1.trim() || !player2.trim()) {
      setError('Please enter names for both players');
      return;
    }

    if (player1.trim() === player2.trim()) {
      setError('Player names must be different');
      return;
    }

    // Clear previous game data
    removeFromStorage('quiz_score_' + player1.trim());
    removeFromStorage('quiz_score_' + player2.trim());
    removeFromStorage('quiz_current_player');
    removeFromStorage('quiz_questions');

    // Save player names
    savePlayers(player1.trim(), player2.trim());

    // Set current player to Player 1
    removeFromStorage('quiz_current_player');
    navigate('/play');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Game Setup</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="player1" className="form-label">
                      Player 1 Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="player1"
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                      placeholder="Enter Player 1 name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="player2" className="form-label">
                      Player 2 Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="player2"
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                      placeholder="Enter Player 2 name"
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Start Game (Player 1)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameSetup;

