// Quiz questions database
// Each question has: text, options array, and correctAnswer index

export const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Which ocean is the largest?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3
  },
  {
    id: 5,
    text: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correctAnswer: 0
  },
  {
    id: 6,
    text: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    id: 7,
    text: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    id: 9,
    text: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2
  },
  {
    id: 10,
    text: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2
  },
  {
    id: 11,
    text: "What is the speed of light in vacuum (approximately)?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0
  },
  {
    id: 12,
    text: "Which programming language is React built with?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2
  },
  {
    id: 13,
    text: "What is the largest organ in the human body?",
    options: ["Liver", "Lungs", "Skin", "Intestines"],
    correctAnswer: 2
  },
  {
    id: 14,
    text: "How many sides does a hexagon have?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2
  },
  {
    id: 15,
    text: "Which country is home to the kangaroo?",
    options: ["New Zealand", "Australia", "South Africa", "Brazil"],
    correctAnswer: 1
  }
];

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get shuffled questions (10 questions randomly selected)
 * @returns {Array} - Array of 10 shuffled questions
 */
export const getShuffledQuestions = () => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, 10); // Return 10 questions
};

