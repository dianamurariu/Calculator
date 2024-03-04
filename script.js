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
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    updateDisplay();
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
      return num1 / num2;
    default:
      return num2;
  }
}

function updateDisplay() {
  display.value = previousInput + ' ' + operator + ' ' + currentInput || '0';
}
