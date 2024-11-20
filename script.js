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
    console.log({ expressionState });
    let newExpressionState = expressionState.slice();

    if (expressionState.length === 0) {
        if (NUMBERS.includes(symbol) || symbol === '(') {
            newExpressionState.push(symbol);
        }
        return newExpressionState;
    }

    const lastItem = expressionState.at(-1);
    // если expressionState === [], то можно ввести только число или '('
    // если lastItem - число, то можно вводить все что угодно дальше
    // если lastItem - оператор, то пропускаем дальше только число или открывающуюся скобку
    // если точка '.', то дальше только число
    // если открывающаяся скобка, то только число
    // если закрывающаяся скобка, то только оператор

    console.log({ symbol, lastItem });
    console.log('последний элемент', typeof lastItem);

    // если lastItem - число, то можно вводить все что угодно дальше
    // если lastItem - число, то нельзя открывающуюся скобку
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

        if (NUMBERS.includes(symbol)) {
            joinToLastItem(symbol, lastItem, newExpressionState);
            // если lastItem - точка '.', то дальше только число
        } else if (symbol === '.' && !lastItem.includes('.')) {
            joinToLastItem(symbol, lastItem, newExpressionState);
        } else {
            // если операторы или скобки
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    // если lastSymbol - оператор, то пропускаем дальше только число или открывающуюся скобку
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

    // если открывающаяся скобка, то только число
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

function compareArrays(expectedOuput, newState) {
    return newState.join('') === expectedOuput.join('');
}

function testGetNewExpressionState() {
    tests = [
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
            consoleText:
                'при вводе оператора после точки не меняется',
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
        {
            testState: ['5', '+', '3'],
            inputSymbol: '=',
            expectedOuput: ['8'],
            consoleText: '5 + 3 = 8',
        },
        {
            testState: ['5', '+', '3', '*', '2'],
            inputSymbol: '=',
            expectedOuput: ['11'],
            consoleText: '5 + 3 * 2 = 11',
        },
        {
            testState: ['5', '+', '3', '*', '(', '2', '+', '4', ')'],
            inputSymbol: '=',
            expectedOuput: ['23'],
            consoleText: '5 + 3  * ( 2 + 4 ) = 23',
        },
    ];

    tests.forEach((test) => {
        expressionState = test.testState;
        const newState = getNewExpressionState(test.inputSymbol);
        console.log(
            test.consoleText,
            compareArrays(test.expectedOuput, newState)
        );
    });
}

// compareArrs(newState, expectedOuput)
// );
// const a = [OPEN_BRACKET]
// const b = [OPEN_BRACKET]
// JSON.stringify(a) === JSON.stringify(b)
// a.join('') === b.join('')
// a.every((aItem, i )=> aItem === b[i])
// a === b
// {a: 1, b:1}, {b: 1, a: 1}
// a[0] === b[0]
// a[1] === b[1]
// ...
// a[last] === b[last]

//['(', '123213', '+', ] getNewExpressionState('0'); ['(', '123213', '+', '0' ]

testGetNewExpressionState();

// [,,,] + 2
// const a = {b: 3}
// const b = a
// b.b = 4
// console.log(a)

// написать функцию, которая считает выражение из expressionState
// разбить строку на токены (числа и операторы)
// если * или /, то считать в первую очередь
// если + или -, то считать во вторую очередь
// 36 + 48 * (23 - 4 / 65) * 5 + 6
// [36, +, 48, *, (, 23, -, 4, /, 65, ),*,5,+,6]
// if ('*' || '/') {
// priority = 2}
// + - его интекс и приоритет
// + 1/1 * 3/2 - 5/1 / 7/2 * 9/2 + 11/1
// [* 3/2, / 7/2, * 9/2 ]
// 36+564-(4/65*5)+6
// [+ 3/2, / 7/2, * 9/2 ]
// 36+564-(154*5)+6
// 36+564-546+6
// 564-546+6
// .... 4565
// [+ 1/1, 123, - 5/1, 351, + 11/1]
// массив с операциями с наивысшим протитетом

// 36+(48*23)-(4/65*5)+6
// [[{+, 1}, {-, 5}, {+, 11}], [{*,3}, {/,7}, {*,9}]]]
// [{*,3}, {/,7}, {*,9}]
// 36+564-(4/65*5)+6
// проходимся по всем операциям, у которых индекс больше, чем у текущего и делаем минус 2
// [[{+, 1}, {-, 5}, {+, 11}], [{*,3}, {/,7}, {*,9}]]]

// 1. Парсим строку и получаем массив токенов
// 36 + 48*23-4/65*5+6 -> [35, +, 48, *, 23, -, 4, /, 65, *, 5, +, 6]
// 2. Идем по массиву и составляем список операций
// [35, +, 48, *, 23, -, 4, /, 65, *, 5, +, 6] -> [[{+, 1}, {-, 5}, {+, 11}], [{*,3}, {/,7}, {*,9}]]]
// 3. Перебираем массив с операциям с конца и выполняем операции по порядку с пересчетом индексов операций при "схлопывании"
// [[{+, 1}, {-, 5}, {+, 11}], [{*,3}, {/,7}, {*,9}]]] -> [{*,3}, {/,7}, {*,9}] => {*,3}
// при {*,3} [35, +, 48, *, 23, -, 4, /, 65, *, 5, +, 6] -> [35, +, 156, -, 4, /, 65, *, 5, +, 6] и пересчитываем все индексы, большие 3 на минус 2
// когда переберем весь массив, то получаем результат

// function calcExpression(expression) {
//     expression.
// }

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
