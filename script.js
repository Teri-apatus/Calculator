import { calculateExpression } from './calculateExpresion.js';
import { getNewExpressionState } from './getNewExpressionState.js';
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

const outputElements = document.getElementById('expressionOutput');

const updateExpressionBinded = updateExpression.bind(
    null,
    outputElements
);

buttonNumber0.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('0', expressionState)
    );
});

buttonNumber1.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('1', expressionState)
    );
});

buttonNumber2.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('2', expressionState)
    );
});

buttonNumber3.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('3', expressionState)
    );
});

buttonNumber4.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('4', expressionState)
    );
});

buttonNumber5.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('5', expressionState)
    );
});

buttonNumber6.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('6', expressionState)
    );
});

buttonNumber7.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('7', expressionState)
    );
});

buttonNumber8.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('8', expressionState)
    );
});

buttonNumber9.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('9', expressionState)
    );
});

buttonPlus.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('+', expressionState)
    );
});

buttonMinus.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('-', expressionState)
    );
});

buttonMultiply.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('*', expressionState)
    );
});

buttonDivide.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('÷', expressionState)
    );
});

buttonOpeningBracket.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState(OPEN_BRACKET, expressionState)
    );
});

buttonClosingBracket.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState(CLOSE_BRACKET, expressionState)
    );
});

buttonPoint.addEventListener('click', () => {
    updateExpressionBinded(
        getNewExpressionState('.', expressionState)
    );
});

buttonBackspace.addEventListener('click', () => {
    updateExpressionBinded(expressionState.slice(0, -1));
});

buttonClear.addEventListener('click', () => {
    updateExpressionBinded(INITIAL_STATE.slice());
});

buttonEquals.addEventListener('click', () => {
    const result = calculateExpression(expressionState);
    updateExpressionBinded(result);
});
