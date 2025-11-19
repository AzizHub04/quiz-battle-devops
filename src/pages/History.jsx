// History page - display match history
import { useState, useEffect } from 'react';
import Navbar from '../components/Shared/Navbar';
import { getMatchHistory, clearMatchHistory } from '../utils/storage';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  // Load history from storage
  const loadHistory = () => {
    const matches = getMatchHistory();
    // Sort by date (newest first)
    matches.sort((a, b) => new Date(b.date) - new Date(a.date));
    setHistory(matches);
  };

  // Clear history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearMatchHistory();
      setHistory([]);
    }
  };

  // Export history as JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">Match History</h2>
                  <div>
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={handleExportJSON}
                      disabled={history.length === 0}
                    >
                      Export JSON
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleClearHistory}
                      disabled={history.length === 0}
                    >
                      Clear History
                    </button>
                  </div>
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">No match history yet.</p>
                    <p className="text-muted">Play some games to see your history here!</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Player 1</th>
                          <th>Score 1</th>
                          <th>Player 2</th>
                          <th>Score 2</th>
                          <th>Winner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((match, index) => {
                          const date = new Date(match.date);
                          const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                          const winner = match.score1 > match.score2 
                            ? match.player1 
                            : match.score2 > match.score1 
                            ? match.player2 
                            : 'Tie';
                          const isTie = match.score1 === match.score2;

                          return (
                            <tr key={index}>
                              <td>{formattedDate}</td>
                              <td className={!isTie && winner === match.player1 ? 'fw-bold text-success' : ''}>
                                {match.player1}
                              </td>
                              <td className={!isTie && winner === match.player1 ? 'fw-bold text-success' : ''}>
                                {match.score1}
                              </td>
                              <td className={!isTie && winner === match.player2 ? 'fw-bold text-success' : ''}>
                                {match.player2}
                              </td>
                              <td className={!isTie && winner === match.player2 ? 'fw-bold text-success' : ''}>
                                {match.score2}
                              </td>
                              <td>
                                {isTie ? (
                                  <span className="badge bg-secondary">Tie</span>
                                ) : (
                                  <span className="badge bg-success">{winner}</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;

