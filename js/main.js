/*----- constants -----*/
const symbols = ['🍒', '🍋','🍋', '🍇','🍇','🍇', '🍊','🍊','🍊', '🍉','🍉','🍉','🍉'];

const payouts = {
  '🍒🍒🍒': 50,
  '🍋🍋🍋': 40,
  '🍇🍇🍇': 30,
  '🍊🍊🍊': 20,
  '🍉🍉🍉': 10,
};

const partialPayouts = {
  '🍒': 5,
  '🍋': 4,
  '🍇': 3,
  '🍊': 2,
  '🍉': 1, 
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
    if (balance === 0) {
      disableSpinButton();
    } else {
      enableSpinButton();
    }
  } 

  function handleSpin() {
    disableSpinButton();
    const wager = parseInt(wagerInput.value);
    if (validateWager(wager)) {
      startSlotMachineAnimation(wager);
    } else {
      enableSpinButton();
    }
  }
  function validateWager(wager) {
    if (isNaN(wager) || wager <= 0 || wager > balance) {
      resultElement.textContent = 'Invalid wager amount. Please enter a valid wager.';
      return false;
    }
    return true;
  }
  function startSlotMachineAnimation(wager) {
    let counter = 0;
    const maxFlashes = 12;
    const initialFlashes = 8;
    let intervalSpeed = 100;
    const slowingDownFactor = 50;
    const slowingPoint = maxFlashes - initialFlashes;
    const flashingInterval = setInterval(() => {
      const results = generateRandomResults();
      displaySlotResults(results);
      counter++;
      if (counter >= maxFlashes) {
        clearInterval(flashingInterval);
        handleSpinResult(results, wager);
      }
      if (counter >= slowingPoint) {
        intervalSpeed += slowingDownFactor;
      }
    }, intervalSpeed);
  }
  function generateRandomResults() {
    const results = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      results.push(symbols[randomIndex]);
    }
    return results;
  }
  function displaySlotResults(results) {
    slot1Element.textContent = results[0];
    slot2Element.textContent = results[1];
    slot3Element.textContent = results[2];
  }
  function handleSpinResult(results, wager) {
    const resultString = results.join('');
    let winnings = 0;
    if (payouts[resultString]) {
      winnings = payouts[resultString] * wager;
      resultElement.textContent = `You won ${winnings}! New balance: ${balance}`;
    } else {
      // Check for partial matches
      const symbolCounts = results.reduce((acc, symbol) => {
        acc[symbol] = (acc[symbol] || 0) + 1;
        return acc;
      }, {});
  
      let partialMatchFound = false;
      for (const symbol in symbolCounts) {
        if (symbolCounts[symbol] === 2) { // Partial match found
          winnings = partialPayouts[symbol] * wager;
          balance += winnings;
          resultElement.textContent = `Partial match of ${symbol}. You won ${winnings}! New balance: ${balance}`;
          partialMatchFound = true;
          break;
        }
      }
      // No matches or partial matches
      if (!partialMatchFound) {
        balance -= wager;
        resultElement.textContent = `You lost. New balance: ${balance}`;
      }
    }
    if (balance <= 0) {
      handleZeroBalance();
    }
    render();
  }
  function disableSpinButton() {
    spinButton.disabled = true;
  }
  function enableSpinButton() {
    spinButton.disabled = false;
  }
  function handleZeroBalance() {
    disableSpinButton();
    balance = 0;
    messageWindow.textContent = 'You have lost all your balance. Click the reset button to start again.';
    messageWindow.style.display = 'block';
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Play Again';
    resetButton.addEventListener('click', () => {
      balance = startingAmount;
      messageWindow.style.display = 'none';
      resultElement.textContent = '';
      render();
    });
    messageWindow.appendChild(resetButton);
  }
  init();