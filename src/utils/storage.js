// Utility functions for localStorage operations
// Simple wrapper to handle all data storage

/**
 * Save data to localStorage
 * @param {string} key - The key to store data under
 * @param {any} value - The value to store (will be JSON stringified)
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key - The key to retrieve data from
 * @returns {any|null} - The parsed value or null if not found
 */
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - The key to remove
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all data from localStorage
 */
export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Specific functions for this app

/**
 * Save user data (for authentication)
 */
export const saveUser = (user) => {
  saveToStorage('quiz_user', user);
};

/**
 * Get current logged-in user
 */
export const getUser = () => {
  return getFromStorage('quiz_user');
};

/**
 * Remove user (logout)
 */
export const removeUser = () => {
  removeFromStorage('quiz_user');
};

/**
 * Save game players
 */
export const savePlayers = (player1, player2) => {
  saveToStorage('quiz_players', { player1, player2 });
};

/**
 * Get game players
 */
export const getPlayers = () => {
  return getFromStorage('quiz_players');
};

/**
 * Save player score
 */
export const savePlayerScore = (playerName, score) => {
  saveToStorage(`quiz_score_${playerName}`, score);
};

/**
 * Get player score
 */
export const getPlayerScore = (playerName) => {
  return getFromStorage(`quiz_score_${playerName}`);
};

/**
 * Save match history
 */
export const saveMatchHistory = (match) => {
  const history = getMatchHistory();
  history.push(match);
  saveToStorage('quiz_history', history);
};

/**
 * Get all match history
 */
export const getMatchHistory = () => {
  return getFromStorage('quiz_history') || [];
};

/**
 * Clear match history
 */
export const clearMatchHistory = () => {
  removeFromStorage('quiz_history');
};

/**
 * Register a new user
 */
export const registerUser = (username, password) => {
  const users = getFromStorage('quiz_users') || {};
  if (users[username]) {
    return false; // User already exists
  }
  users[username] = password;
  saveToStorage('quiz_users', users);
  return true;
};

/**
 * Check if username and password match
 */
export const loginUser = (username, password) => {
  const users = getFromStorage('quiz_users') || {};
  if (users[username] === password) {
    saveUser({ username });
    return true;
  }
  return false;
};

