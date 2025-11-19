// QuestionCard component - displays a single question with options
function QuestionCard({ question, selectedAnswer, onAnswerSelect }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4">{question.text}</h5>
        <div className="list-group">
          {question.options.map((option, index) => (
            <button
              key={index}
              type="button"
              className={`list-group-item list-group-item-action ${
                selectedAnswer === index ? 'active' : ''
              }`}
              onClick={() => onAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;

