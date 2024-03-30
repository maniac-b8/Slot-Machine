/*----- constants -----*/
const symbols = ['🍒', '🍋', '🍇', '🍊', '🍉'];

const payouts = {
  '🍒🍒🍒': 50,
  '🍋🍋🍋': 40,
  '🍇🍇🍇': 30,
  '🍊🍊🍊': 20,
  '🍉🍉🍉': 10,
};

/*----- state variables -----*/
let startingAmount = 100;
let balance = startingAmount;

/*----- cached elements  -----*/
const spinButton = document.getElementById('spin');
const wagerInput = document.getElementById('wager');
const slot1Element = document.getElementById('slot1');
const slot2Element = document.getElementById('slot2');
const slot3Element = document.getElementById('slot3');
const resultElement = document.getElementById('result');
const balanceElement = document.getElementById('balance');
const messageWindow = document.getElementById('message-window');

/*----- event listeners -----*/
spinButton.addEventListener('click', handleSpin);

/*----- functions -----*/
function init() {
    balanceElement.textContent = balance;
    render();
  }

function render() {
    balanceElement.textContent = balance;
  }  

function handleSpin() {
  disableSpinButton();
  const wager = parseInt(wagerInput.value);
  if (validateWager(wager)) {
    startSlotMachiineAnimation(wager);
  } else {
    enableSpinButton();
  }
}
  init();