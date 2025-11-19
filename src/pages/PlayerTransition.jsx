// Player Transition page - shows message between player turns
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import { getPlayers, getFromStorage } from '../utils/storage';

function PlayerTransition() {
  const navigate = useNavigate();

  useEffect(() => {
    const players = getPlayers();
    const currentPlayer = getFromStorage('quiz_current_player');
    
    if (!players) {
      navigate('/game-setup');
      return;
    }

    // Show message for 2 seconds then navigate to play
    const timer = setTimeout(() => {
      navigate('/play', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const players = getPlayers();
  const currentPlayer = getFromStorage('quiz_current_player');
  const player2Name = players?.player2 || 'Player 2';

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow text-center">
              <div className="card-body p-5">
                <h2 className="card-title mb-4">Player 1 Completed!</h2>
                <p className="lead">
                  Now it's <strong>{player2Name}'s</strong> turn!
                </p>
                <div className="spinner-border text-primary mt-4" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Preparing your quiz...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayerTransition;

