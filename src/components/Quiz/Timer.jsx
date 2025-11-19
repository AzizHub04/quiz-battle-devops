// Timer component - displays countdown timer
function Timer({ seconds, onTimeUp }) {
  // Determine color based on remaining time
  const getColorClass = () => {
    if (seconds <= 3) return 'text-danger';
    if (seconds <= 5) return 'text-warning';
    return 'text-primary';
  };

  return (
    <div className="text-center mb-3">
      <h2 className={getColorClass()}>
        Time: {seconds}s
      </h2>
      <div className="progress" style={{ height: '10px' }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${(seconds / 10) * 100}%` }}
          aria-valuenow={seconds}
          aria-valuemin="0"
          aria-valuemax="10"
        ></div>
      </div>
    </div>
  );
}

export default Timer;

