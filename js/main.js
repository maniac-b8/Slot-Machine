/*----- constants -----*/
const slotConfig = {
  symbols: ['si/a.jpg', 'si/r.jpg', 'si/r.jpg', 'si/k.jpg', 'si/k.jpg', 'si/k.jpg', 'si/m.jpg', 'si/m.jpg', 'si/m.jpg', 'si/s.jpg', 'si/s.jpg', 'si/s.jpg', 'si/s.jpg'],
  payouts: {
    'si/a.jpgsi/a.jpgsi/a.jpg': 50,
    'si/r.jpgsi/r.jpgsi/r.jpg': 40,
    'si/k.jpgsi/k.jpgsi/k.jpg': 30,
    'si/m.jpgsi/m.jpgsi/m.jpg': 20,
    'si/s.jpgsi/s.jpgsi/s.jpg': 10,
  },
  partialPayouts: {
    'si/a.jpg': 5,
    'si/r.jpg': 4,
    'si/k.jpg': 3,
    'si/m.jpg': 2, 
    'si/s.jpg': 1,
  }
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
    const spinSound = new Audio('aud/spin.mp3');
    spinSound.play();
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
    const maxFlashes = 30;
    const initialFlashes = 16;
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
      const randomIndex = Math.floor(Math.random() * slotConfig.symbols.length);
      results.push(slotConfig.symbols[randomIndex]);
    }
    return results;
  }

  function displaySlotResults(results) {
    slot1Element.style.backgroundImage = `url(${results[0]})`;
    slot2Element.style.backgroundImage = `url(${results[1]})`;
    slot3Element.style.backgroundImage = `url(${results[2]})`;
  }

  function handleSpinResult(results, wager) {
    const resultString = results.join('');
    let winnings = 0;
    if (slotConfig.payouts[resultString]) {
      winnings = slotConfig.payouts[resultString] * wager;
      balance += winnings;
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
          winnings = slotConfig.partialPayouts[symbol] * wager;
          balance += winnings;
          resultElement.textContent = `Partial match. You won ${winnings}! New balance: ${balance}`;
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
    messageWindow.textContent = 'You have lost all your coin. If you or anyone is struggling with gambling addiction please call 1-800-GAMBLER for help';
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