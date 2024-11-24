import {calculateExpression} from './calculateExpresion.js'
import { compareArrays } from './utils.js';

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
const INITIAL_STATE = [];

let expressionState = INITIAL_STATE.slice();

const MATH_OPERATION_SYMBOLS = ['+', '-', '*', '÷'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPEN_BRACKET = '(';
const CLOSE_BRACKET = ')';

function updateExpression(newExpression) {
    expressionState = newExpression;
    outputElements.innerHTML = expressionState.join(' ');
}

function joinToLastItem(symbol, lastItem, newExpressionState) {
    const newLastItem = lastItem + symbol;
    newExpressionState[newExpressionState.length - 1] = newLastItem;
}

function getNewExpressionState(symbol) {
    let newExpressionState = expressionState.slice();
debugger
    if (expressionState.length === 0) {
        if (NUMBERS.includes(symbol) || symbol === '(') {
            newExpressionState.push(symbol);
        }
        return newExpressionState;
    }

    const lastItem = expressionState.at(-1);

    if (
        NUMBERS.includes(lastItem) /* если однозначное число*/ ||
        lastItem.length > 1 /* если многозначное число*/
    ) {
        if (
            (lastItem.includes('.') && symbol === '.') ||
            symbol === OPEN_BRACKET
        ) {
            return newExpressionState;
        }

        const lastSymbolOfItem = lastItem.at(-1);

        if (lastSymbolOfItem === '.') {
            if (
                symbol === CLOSE_BRACKET ||
                MATH_OPERATION_SYMBOLS.includes(symbol)
            ) {
                return newExpressionState;
            }
        }

        if (NUMBERS.includes(symbol)) {
            joinToLastItem(symbol, lastItem, newExpressionState);
        } else if (symbol === '.' && !lastItem.includes('.')) {
            joinToLastItem(symbol, lastItem, newExpressionState);
        } else {
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    if (MATH_OPERATION_SYMBOLS.includes(lastItem)) {
        if (MATH_OPERATION_SYMBOLS.includes(symbol)) {
            newExpressionState[newExpressionState.length - 1] =
                symbol;
        }
        if (NUMBERS.includes(symbol) || symbol === OPEN_BRACKET) {
            newExpressionState.push(symbol);
        }
        return newExpressionState;
    }

    if (lastItem === OPEN_BRACKET) {
        if (NUMBERS.includes(symbol)) {
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    if (lastItem === CLOSE_BRACKET) {
        if (MATH_OPERATION_SYMBOLS.includes(symbol)) {
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    throw new Error('unexpeted behavior');
}

function testGetNewExpressionState() {
    const tests = [
        {
            testState: [],
            inputSymbol: '+',
            expectedOuput: [],
            consoleText: 'при вводе оператора не меняется на пустом',
        },
        {
            testState: [],
            inputSymbol: '.',
            expectedOuput: [],
            consoleText: 'при вводе точки не меняется на пустом',
        },
        {
            testState: [],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [],
            consoleText:
                'при вводе закрывающейся скобки не меняется на пустом',
        },
        {
            testState: [],
            inputSymbol: OPEN_BRACKET,
            expectedOuput: [OPEN_BRACKET],
            consoleText:
                'при вводе открывающейся скобки меняется на не пустой',
        },
        {
            testState: [],
            inputSymbol: '0',
            expectedOuput: ['0'],
            consoleText: 'при вводе числа меняется на не пустой',
        },
        {
            testState: ['123'],
            inputSymbol: '+',
            expectedOuput: ['123', '+'],
            consoleText:
                'при вводе оператора после числа добавляется следующим элементом массива',
        },
        {
            testState: ['123'],
            inputSymbol: '.',
            expectedOuput: ['123.'],
            consoleText:
                'при вводе точки после числа добавляется к числу',
        },
        {
            testState: ['123'],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: ['123', CLOSE_BRACKET],
            consoleText:
                'при вводе закрывающейся скобки после числа добавляется следующим элементом массива',
        },
        {
            testState: ['123'],
            inputSymbol: OPEN_BRACKET,
            expectedOuput: ['123'],
            consoleText: 'при вводе открывающейся скобки не меняется',
        },
        {
            testState: ['123'],
            inputSymbol: '0',
            expectedOuput: ['1230'],
            consoleText:
                'при вводе числа после числа добавляется к числу',
        },
        {
            testState: ['123', '+'],
            inputSymbol: '-',
            expectedOuput: ['123', '-'],
            consoleText:
                'при вводе оператора после оператора меняется на новый оператор',
        },
        {
            testState: ['123', '+'],
            inputSymbol: '.',
            expectedOuput: ['123', '+'],
            consoleText:
                'при вводе точки после оператора не меняется',
        },
        {
            testState: ['123', '+'],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: ['123', '+'],
            consoleText:
                'при вводе закрывающейся скобки после оператора не меняется',
        },
        {
            testState: ['123', '+'],
            inputSymbol: OPEN_BRACKET,
            expectedOuput: ['123', '+', OPEN_BRACKET],
            consoleText:
                'при вводе открывающейся скобки после оператора добавляется следующим элементом массива',
        },
        {
            testState: ['123', '+'],
            inputSymbol: '0',
            expectedOuput: ['123', '+', '0'],
            consoleText:
                'при вводе числа после оператора добавляется следующим элементом массива',
        },

        {
            testState: [OPEN_BRACKET],
            inputSymbol: '+',
            expectedOuput: [OPEN_BRACKET],
            consoleText:
                'при вводе оператора после открывающейся скобки не меняется',
        },
        {
            testState: [OPEN_BRACKET],
            inputSymbol: '.',
            expectedOuput: [OPEN_BRACKET],
            consoleText:
                'при вводе точки после открывающейся скобки не меняется',
        },
        {
            testState: [OPEN_BRACKET],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [OPEN_BRACKET],
            consoleText:
                'при вводе закрывающейся скобки после открывающейся скобки не меняется',
        },
        {
            testState: [OPEN_BRACKET],
            inputSymbol: OPEN_BRACKET,
            expectedOuput: [OPEN_BRACKET],
            consoleText:
                'при вводе открывающейся скобки после открывающейся скобки не меняется',
        },
        {
            testState: [OPEN_BRACKET],
            inputSymbol: '0',
            expectedOuput: [OPEN_BRACKET, '0'],
            consoleText:
                'при вводе числа после открывающейся скобки добавляется следующим элементом массива',
        },

        {
            testState: [CLOSE_BRACKET],
            inputSymbol: '+',
            expectedOuput: [CLOSE_BRACKET, '+'],
            consoleText:
                'при вводе оператора после закрывающейся скобки добавляется следующим элементом массива',
        },
        {
            testState: [CLOSE_BRACKET],
            inputSymbol: '.',
            expectedOuput: [CLOSE_BRACKET],
            consoleText:
                'при вводе точки после закрывающейся скобки не меняется',
        },
        {
            testState: [CLOSE_BRACKET],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [CLOSE_BRACKET],
            consoleText:
                'при вводе закрывающейся скобки после закрывающейся скобки не меняется',
        },
        {
            testState: [CLOSE_BRACKET],
            inputSymbol: OPEN_BRACKET,
            expectedOuput: [CLOSE_BRACKET],
            consoleText:
                'при вводе открывающейся скобки после закрывающейся скобки не меняется',
        },
        {
            testState: [CLOSE_BRACKET],
            inputSymbol: '0',
            expectedOuput: [CLOSE_BRACKET],
            consoleText:
                'при вводе числа после закрывающейся скобки не меняется',
        },
        {
            testState: ['5.'],
            inputSymbol: '+',
            expectedOuput: ['5.'],
            consoleText: `при вводе оператора после точки не меняется`,
        },
        {
            testState: ['5.'],
            inputSymbol: '.',
            expectedOuput: ['5.'],
            consoleText: 'при вводе точки после точки не меняется',
        },
        {
            testState: ['5.'],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: ['5.'],
            consoleText:
                'при вводе закрывающейся скобки после точки не меняется',
        },
        {
            testState: ['5.'],
            inputSymbol: OPEN_BRACKET,
            expectedOuput: ['5.'],
            consoleText:
                'при вводе открывающейся скобки после точки не меняется',
        },
        {
            testState: ['5.'],
            inputSymbol: '0',
            expectedOuput: ['5.0'],
            consoleText:
                'при вводе числа после точки число добавляется к точке',
        },
    ];

    let testResult = true;
    tests.forEach((test) => {
        expressionState = test.testState;
        const newState = getNewExpressionState(test.inputSymbol);

        if (!compareArrays(test.expectedOuput, newState)) {
            testResult = false;
            console.log(test.consoleText, false);
        }
    });

    if (testResult) {
        console.log('getNewExpressionState: Все тесты пройдены');
    }
}

testGetNewExpressionState();

buttonNumber0.addEventListener('click', () => {
    updateExpression(getNewExpressionState('0'));
});

buttonNumber1.addEventListener('click', () => {
    updateExpression(getNewExpressionState('1'));
});

buttonNumber2.addEventListener('click', () => {
    updateExpression(getNewExpressionState('2'));
});

buttonNumber3.addEventListener('click', () => {
    updateExpression(getNewExpressionState('3'));
});

buttonNumber4.addEventListener('click', () => {
    updateExpression(getNewExpressionState('4'));
});

buttonNumber5.addEventListener('click', () => {
    updateExpression(getNewExpressionState('5'));
});

buttonNumber6.addEventListener('click', () => {
    updateExpression(getNewExpressionState('6'));
});

buttonNumber7.addEventListener('click', () => {
    updateExpression(getNewExpressionState('7'));
});

buttonNumber8.addEventListener('click', () => {
    updateExpression(getNewExpressionState('8'));
});

buttonNumber9.addEventListener('click', () => {
    updateExpression(getNewExpressionState('9'));
});

buttonPlus.addEventListener('click', () => {
    updateExpression(getNewExpressionState('+'));
});

buttonMinus.addEventListener('click', () => {
    updateExpression(getNewExpressionState('-'));
});

buttonMultiply.addEventListener('click', () => {
    updateExpression(getNewExpressionState('*'));
});

buttonDivide.addEventListener('click', () => {
    updateExpression(getNewExpressionState('÷'));
});

buttonOpeningBracket.addEventListener('click', () => {
    updateExpression(getNewExpressionState('('));
});

buttonClosingBracket.addEventListener('click', () => {
    updateExpression(getNewExpressionState(')'));
});

buttonPoint.addEventListener('click', () => {
    updateExpression(getNewExpressionState('.'));
});

buttonBackspace.addEventListener('click', () => {
    updateExpression(expressionState.slice(0, -1));
});

buttonClear.addEventListener('click', () => {
    updateExpression(INITIAL_STATE.slice());
});

buttonEquals.addEventListener('click', () => {
  const result = calculateExpression(expressionState)
  updateExpression(result);
});
