// Home page - main dashboard
import { Link } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import { getUser } from '../utils/storage';

function Home() {
  const user = getUser();

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body text-center p-5">
                <h1 className="card-title mb-4">Welcome to Quiz Battle!</h1>
                <p className="lead mb-4">
                  Hello, <strong>{user?.username || 'Player'}</strong>!
                </p>
                <p className="mb-4">
                  Challenge a friend in an exciting 2-player quiz battle. 
                  Answer questions correctly to score points and see who wins!
                </p>
                
                <div className="d-grid gap-2 col-md-6 mx-auto">
                  <Link to="/game-setup" className="btn btn-primary btn-lg">
                    Start New Game
                  </Link>
                  <Link to="/history" className="btn btn-outline-secondary">
                    View History
                  </Link>
                </div>

                <div className="mt-5">
                  <h5>How to Play:</h5>
                  <ul className="list-unstyled text-start" style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <li className="mb-2">1. Click "Start New Game" to begin</li>
                    <li className="mb-2">2. Enter names for Player 1 and Player 2</li>
                    <li className="mb-2">3. Player 1 answers 10 questions first</li>
                    <li className="mb-2">4. Then Player 2 answers the same questions</li>
                    <li className="mb-2">5. The player with the highest score wins!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

