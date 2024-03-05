let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let lastPress = ''; // Add this variable

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
    let result = performCalculation();
    currentInput = formatResult(result);
    previousInput = '';
    operator = '';
    updateDisplay();

    lastPress = 'calculation';
  }
}

function performCalculation() {
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
        // Division by zero error
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
      return parseFloat(result.toFixed(4)).toString();
    }
  }
  return formattedResult;
}

function updateDisplay() {
  let result = previousInput + ' ' + operator + ' ' + currentInput;

  // Check for division by zero error
  if (result.includes('Cannot divide by 0!')) {
    display.value = 'Cannot divide by 0!';
  } else {
    display.value = result || '0';
  }
}
