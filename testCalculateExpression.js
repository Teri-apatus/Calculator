import { compareArrays } from './utils.js';
import { calculateExpression } from './calculateExpresion.js';

export function testCalculateExpression() {
    const tests = [
        {
            testState: ['5', '+', '3'],
            expectedOuput: ['8'],
            consoleText: '5 + 3 = 8',
        },
        {
            testState: ['5', '+', '3', '*', '2'],
            expectedOuput: ['11'],
            consoleText: '5 + 3 * 2 = 11',
        },
        {
            testState: ['5', '+', '3', '*', '(', '2', '+', '4', ')'],
            expectedOuput: ['23'],
            consoleText: '5 + 3 * ( 2 + 4 ) = 23',
        },
        {
            testState: [
                '5',
                '+',
                '3',
                ')',
                '*',
                '(',
                '2',
                '+',
                '4',
                ')',
            ],
            expectedOuput: [
                '5',
                '+',
                '3',
                ')',
                '*',
                '(',
                '2',
                '+',
                '4',
                ')',
            ],
            consoleText:
                'возвращаем выражение как было при неправильном порядке скобок',
        },
    ];

    let isAllTestsPassed = true;

    tests.forEach((test) => {
        const result = calculateExpression(test.testState);

        if (!compareArrays(test.expectedOuput, result)) {
            isAllTestsPassed = false;
            console.warn(test.consoleText, {
                expected: test.expectedOuput,
                result,
            });
        }
    });

    if (isAllTestsPassed) {
        console.log('calculateExpression: Все тесты пройдены');
    }
}
