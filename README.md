# React Minesweeper

This project is a modern implementation of the classic Minesweeper game using React. It features a clean, responsive design with additional enhancements like sound effects and a high score system.

## Features

- Classic Minesweeper gameplay
- Three difficulty levels: Easy, Medium, and Hard
- First-click safety (first clicked cell is never a mine)
- Sound effects for interactions
- High score system with localStorage persistence
- Responsive design for various screen sizes

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/react-minesweeper.git
   cd react-minesweeper
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Play

1. Click on a cell to reveal it.
2. Right-click (or long-press on mobile) to flag a cell you suspect contains a mine.
3. The numbers on the revealed cells indicate how many mines are in the adjacent cells.
4. Reveal all non-mine cells to win the game.
5. If you reveal a mine, the game is over.

## Game Controls

- Left-click: Reveal a cell
- Right-click: Flag/unflag a cell
- New Game button: Start a new game
- Difficulty selector: Choose between Easy (10 mines), Medium (20 mines), and Hard (30 mines)

## Technical Details

- Built with React (Create React App)
- State management using React Hooks (useState, useEffect, useCallback)
- Custom game logic for board generation and game mechanics
- Utilizes localStorage for persisting high scores

## Future Enhancements

- Add animations for cell reveals and game over scenarios
- Implement a custom difficulty setting
- Add a dark mode theme
- Create a leaderboard system with online persistence

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/react-minesweeper/issues) if you want to contribute.

## License

This project is open source and available under the [MIT License](LICENSE).