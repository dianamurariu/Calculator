// script.js

let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function getNumber(num) {
  currentInput += num;
  updateDisplay();
}

function getOperator(op) {
  if (currentInput !== '') {
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
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
  }
}

function formatResult(result) {
  let formattedResult = result.toString();
  if (formattedResult.includes('.')) {
    // If result has a decimal point
    let decimalPart = formattedResult.split('.')[1];
    if (decimalPart.length > 4) {
      // If decimal part has more than 4 digits, round to 4 decimal places
      return parseFloat(result.toFixed(4)).toString();
    }
  }
  return formattedResult;
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
      return num1 / num2;
    default:
      return num2;
  }
}

function updateDisplay() {
  display.value = previousInput + ' ' + operator + ' ' + currentInput || '0';
}
