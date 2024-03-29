let display = document.getElementById('display');

let currentInput = '';
let operator = '';
let previousInput = '';
let lastPress = '';

function getNumber(num) {
  if (lastPress === 'calculation') {
    clearDisplay();
    lastPress = '';
  }

  currentInput += num;
  updateDisplay();
}

function getOperator(op) {
  if (currentInput !== '') {
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
    lastPress = '';
  }
}

function addDecimal() {
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}

function deleteLastDigit() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = '';
  updateDisplay();
}

function calculateEquals() {
  if (operator !== '' && currentInput !== '') {
    let result = MathCalculation();
    currentInput = formatResult(result);
    previousInput = '';
    operator = '';
    updateDisplay();

    lastPress = 'calculation';
  }
}

function MathCalculation() {
  let num1 = parseFloat(previousInput);
  let num2 = parseFloat(currentInput);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return 'Cannot divide by 0!';
      } else {
        return num1 / num2;
      }
    default:
      return num2;
  }
}

function formatResult(result) {
  let formattedResult = result.toString();
  if (formattedResult.includes('.')) {
    let decimalPart = formattedResult.split('.')[1];
    if (decimalPart.length > 4) {
      return parseFloat(result.toFixed(4)).toLocaleString();
    }
  }
  return formattedResult.toLocaleString();
}

function addCommas(value) {
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function updateDisplay() {
  let result = previousInput + ' ' + operator + ' ' + currentInput;

  if (result.includes('Cannot divide by 0!')) {
    display.value = 'Cannot divide by 0!';
  } else {
    let formattedResult = result
      ? addCommas(previousInput) +
        ' ' +
        operator +
        ' ' +
        addCommas(currentInput)
      : '0';
    display.value = formattedResult;
  }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  if (!isNaN(key) && key !== ' ') {
    getNumber(key);
  } else {
    switch (key) {
      case '+':
      case '-':
      case '*':
      case '/':
        getOperator(key);
        break;
      case '.':
        addDecimal();
        break;
      case 'Enter':
        calculateEquals();
        break;
      case '=':
        calculateEquals();
        break;
      case 'Delete':
        deleteLastDigit();
        break;
      case 'Escape':
        clearDisplay();
        break;
    }
  }
}
