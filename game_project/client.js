const gameBoard = document.getElementById('gameBoard');

// Create the game grid
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  gameBoard.appendChild(cell);
}

// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

// Listen for messages from the server
ws.onmessage = (event) => {
  const { index, player } = JSON.parse(event.data);
  const cell = gameBoard.children[index];
  if (cell) {
    cell.textContent = player;
  }
};

// Handle cell clicks
gameBoard.addEventListener('click', (event) => {
  const cell = event.target;
  if (!cell.classList.contains('cell') || cell.textContent) return;

  const index = cell.dataset.index;
  const player = 'X'; // Replace with dynamic player assignment
  cell.textContent = player;

  // Send move to server
  ws.send(JSON.stringify({ index, player }));
});
