# Quiz Battle - 2 Players Offline

A fun, offline quiz battle game for two players built with React, Vite, and Bootstrap.

## 🎮 Features

- **User Authentication** - Simple mock authentication with localStorage
- **Two-Player Mode** - Play offline with a friend
- **10 Questions** - Randomly selected from a pool of 15 questions
- **Timer** - 10 seconds per question
- **Score Tracking** - Points awarded for correct answers
- **Match History** - View all past matches
- **Export Data** - Download match history as JSON

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd quiz-battle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will be available at `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
quiz-battle/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/          (No auth components needed - handled in pages)
│   │   ├── Quiz/
│   │   │   ├── QuestionCard.jsx
│   │   │   └── Timer.jsx
│   │   ├── Score/          (No separate score components)
│   │   └── Shared/
│   │       └── Navbar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── GameSetup.jsx
│   │   ├── Play.jsx
│   │   ├── Result.jsx
│   │   └── History.jsx
│   ├── utils/
│   │   ├── storage.js      (localStorage utilities)
│   │   └── questions.js    (Question database)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## 🎯 How to Play

1. **Register/Login:**
   - Create a new account or login with existing credentials
   - All data is stored locally in your browser

2. **Start a Game:**
   - Click "Start New Game" from the home page
   - Enter names for Player 1 and Player 2
   - Click "Start Game (Player 1)"

3. **Play the Quiz:**
   - Player 1 answers 10 questions first
   - Each question has a 10-second timer
   - Select an answer and click "Next Question"
   - If time runs out, the question is skipped (no points)

4. **Player 2's Turn:**
   - After Player 1 finishes, Player 2 automatically starts
   - Player 2 answers the same questions

5. **View Results:**
   - After both players finish, see the results
   - The player with the highest score wins!

6. **View History:**
   - Check the History page to see all past matches
   - Export data as JSON or clear history

## 🛠️ Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - CSS framework (via CDN)
- **localStorage** - Data persistence

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Customization

### Adding More Questions

Edit `src/utils/questions.js` and add more question objects:

```javascript
{
  id: 16,
  text: "Your question here?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correctAnswer: 0  // Index of correct answer (0-3)
}
```

### Changing Timer Duration

Edit `src/pages/Play.jsx` and change the `useState(10)` to your desired seconds.

### Changing Points Per Question

Edit `src/pages/Play.jsx` and change `setScore(score + 10)` to your desired points.

## 📦 Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory.

## 🐛 Troubleshooting

**Problem:** App doesn't load
- **Solution:** Make sure all dependencies are installed with `npm install`

**Problem:** Routes not working
- **Solution:** Ensure you're using `npm run dev` and not opening the HTML file directly

**Problem:** Data not persisting
- **Solution:** Check browser console for localStorage errors. Some browsers disable localStorage in private mode.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development Notes

- All data is stored in browser localStorage
- No backend or API calls required
- Perfect for offline use
- Simple, beginner-friendly code structure
- Uses only React hooks (useState, useEffect)
- No complex state management libraries

Enjoy playing Quiz Battle! 🎉
