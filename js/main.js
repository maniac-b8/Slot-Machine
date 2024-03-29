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


/*----- event listeners -----*/


/*----- functions -----*/
function init() {
    balanceElement.textContent = balance;
    render();
  }

function render() {
    balanceElement.textContent = balance;
  }  


  init();