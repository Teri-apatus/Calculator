import { calculateExpression } from './calculateExpresion.js';
import { getNewExpressionState } from './getNewExpressionState.js';
import { testGetNewExpressionState } from './testGetNewExpressionState.js';
import {
    updateExpression,
    expressionState,
} from './updateExpression.js';
import {
    INITIAL_STATE,
    OPEN_BRACKET,
    CLOSE_BRACKET,
} from './variables.js';

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
const buttonEquals = document.getElementById('equals');

testGetNewExpressionState();

buttonNumber0.addEventListener('click', () => {
    updateExpression(getNewExpressionState('0', expressionState));
});

buttonNumber1.addEventListener('click', () => {
    updateExpression(getNewExpressionState('1', expressionState));
});

buttonNumber2.addEventListener('click', () => {
    updateExpression(getNewExpressionState('2', expressionState));
});

buttonNumber3.addEventListener('click', () => {
    updateExpression(getNewExpressionState('3', expressionState));
});

buttonNumber4.addEventListener('click', () => {
    updateExpression(getNewExpressionState('4', expressionState));
});

buttonNumber5.addEventListener('click', () => {
    updateExpression(getNewExpressionState('5', expressionState));
});

buttonNumber6.addEventListener('click', () => {
    updateExpression(getNewExpressionState('6', expressionState));
});

buttonNumber7.addEventListener('click', () => {
    updateExpression(getNewExpressionState('7', expressionState));
});

buttonNumber8.addEventListener('click', () => {
    updateExpression(getNewExpressionState('8', expressionState));
});

buttonNumber9.addEventListener('click', () => {
    updateExpression(getNewExpressionState('9', expressionState));
});

buttonPlus.addEventListener('click', () => {
    updateExpression(getNewExpressionState('+', expressionState));
});

buttonMinus.addEventListener('click', () => {
    updateExpression(getNewExpressionState('-', expressionState));
});

buttonMultiply.addEventListener('click', () => {
    updateExpression(getNewExpressionState('*', expressionState));
});

buttonDivide.addEventListener('click', () => {
    updateExpression(getNewExpressionState('÷', expressionState));
});

buttonOpeningBracket.addEventListener('click', () => {
    updateExpression(
        getNewExpressionState(OPEN_BRACKET, expressionState)
    );
});

buttonClosingBracket.addEventListener('click', () => {
    updateExpression(
        getNewExpressionState(CLOSE_BRACKET, expressionState)
    );
});

buttonPoint.addEventListener('click', () => {
    updateExpression(getNewExpressionState('.', expressionState));
});

buttonBackspace.addEventListener('click', () => {
    updateExpression(expressionState.slice(0, -1));
});

buttonClear.addEventListener('click', () => {
    updateExpression(INITIAL_STATE.slice());
});

buttonEquals.addEventListener('click', () => {
    const result = calculateExpression(expressionState);
    updateExpression(result);
});
