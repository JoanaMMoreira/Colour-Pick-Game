const timeRemainingField = document.getElementById('time-remaining');
const playerScoreField = document.getElementById('player-score');
const colourCircleContainer = document.getElementById('colour-circle');
const availableColoursContainer = document.getElementById('available-colours');

const timeRemaining: string = '20';
const playerScore: string = '0';
const availableColours = ['red', 'blue', 'green', 'yellow', 'orange'];

timeRemainingField.append(timeRemaining);
playerScoreField.append(playerScore);

let selectedColour = null;

const handleClick = (index: number) => {
  selectedColour = index;
  console.log(selectedColour);
};

availableColours.map((colour, index) => {
  const colourContainer = document.createElement('div');
  colourContainer.classList.add(colour);
  colourContainer.id = index.toString();
  colourContainer.addEventListener('click', () => {
    handleClick(index);
  });
  availableColoursContainer.append(colourContainer);
});
