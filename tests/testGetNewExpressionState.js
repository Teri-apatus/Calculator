import {
    OPEN_BRACKET,
    CLOSE_BRACKET,
    INITIAL_STATE,
} from '../variables.js';
import { getNewExpressionState } from '../getNewExpressionState.js';
import { compareArrays } from '../utils.js';

let expressionState = INITIAL_STATE.slice();

export function testGetNewExpressionState() {
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
            testState: [OPEN_BRACKET, '123'],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [OPEN_BRACKET, '123', CLOSE_BRACKET],
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
            testState: [OPEN_BRACKET, '123', '+'],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [OPEN_BRACKET, '123', '+'],
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
            testState: [OPEN_BRACKET, '5', CLOSE_BRACKET],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [OPEN_BRACKET, '5', CLOSE_BRACKET],
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
            testState: [OPEN_BRACKET, '5.'],
            inputSymbol: CLOSE_BRACKET,
            expectedOuput: [OPEN_BRACKET, '5.'],
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
        // TODO: добавить тест кейс для скобок
    ];

    let testResult = true;
    tests.forEach((test) => {
        expressionState = test.testState;
        const newState = getNewExpressionState(
            test.inputSymbol,
            expressionState
        );

        if (!compareArrays(test.expectedOuput, newState)) {
            testResult = false;
            console.log(test.consoleText, false);
        }
    });

    if (testResult) {
        console.log('getNewExpressionState: Все тесты пройдены');
    }
}
