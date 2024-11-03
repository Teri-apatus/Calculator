const buttonNumber0 = document.getElementById('number0');
const buttonNumber1 = document.getElementById('number1');
const buttonNumber2 = document.getElementById('number2');
const buttonNumber3 = document.getElementById('number3');
const buttonNumber4 = document.getElementById('number4');
const buttonNumber5 = document.getElementById('number5');
const buttonNumber6 = document.getElementById('number6');
const buttonNumber7 = document.getElementById('number7');
const buttonNumber8 = document.getElementById('number8');
const buttonNumber9 = document.getElementById('number9');
const buttonPlus = document.getElementById('plus');
const buttonMinus = document.getElementById('minus');
const buttonMultiply = document.getElementById('multiply');
const buttonDivide = document.getElementById('divide');
const buttonOpeningBracket =
    document.getElementById('openingBracket');
const buttonClosingBracket =
    document.getElementById('closingBracket');
const buttonPoint = document.getElementById('point');
const buttonBackspace = document.getElementById('backspace');
const buttonClear = document.getElementById('clear');

const outputElements = document.getElementById('expressionOutput');
const INITIAL_STATE = '';

let expressionState = outputElements.innerHTML;

// let lastSymbol = expressionState.at(-1);

function updateExpression(newExpression) {
    expressionState = newExpression;
    outputElements.innerHTML = newExpression;
    outputElements.innerHTML = expressionState;
}

buttonNumber0.addEventListener('click', () => {
    expressionState += 0;
});

buttonNumber1.addEventListener('click', () => {
    expressionState += 1;
    console.log(expressionState);
});

buttonNumber2.addEventListener('click', () => {
    expressionState += 2;
    console.log(outputElements.innerHTML);
});

buttonNumber3.addEventListener('click', () => {
    expressionState += 3;
});

buttonNumber4.addEventListener('click', () => {
    expressionState += 4;
});

buttonNumber5.addEventListener('click', () => {
    expressionState += 5;
});

buttonNumber6.addEventListener('click', () => {
    expressionState += 6;
});

buttonNumber7.addEventListener('click', () => {
    expressionState += 7;
});

buttonNumber8.addEventListener('click', () => {
    expressionState += 8;
});

buttonNumber9.addEventListener('click', () => {
    expressionState += 9;
});

buttonPlus.addEventListener('click', () => {
    if (lastSymbol == '+') {
        return outputElements;
    }
    expressionState += '+';
});

buttonMinus.addEventListener('click', () => {
    if (expressionState.endsWith('-')) {
        return outputElements;
    }
    expressionState += '-';
});

buttonMultiply.addEventListener('click', () => {
    if (expressionState.endsWith('*')) {
        return outputElements;
    }
    expressionState += '*';
});

buttonDivide.addEventListener('click', () => {
    if (expressionState.endsWith('÷')) {
        return outputElements;
    }
    expressionState += '÷';
});

buttonOpeningBracket.addEventListener('click', () => {
    expressionState = '(';
});

buttonClosingBracket.addEventListener('click', () => {
    expressionState = ')';
});

buttonPoint.addEventListener('click', () => {
    if (expressionState.endsWith('.')) {
        return outputElements;
    }
    expressionState = '.';
});

buttonBackspace.addEventListener('click', () => {
    expressionState = expressionState.slice(0, -1);
    console.log(expressionState);
});

buttonClear.addEventListener('click', () => {
    expressionState = INITIAL_STATE;
});
